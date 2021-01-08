const swap = (f) => (a, b) => f(b, a);
const compose = (first, ...fns) => (...args) => fns.reduce((previous, current) => current(previous), first(...args));
const curry = (fn, arityLeft) => {
    const arity = arityLeft || fn.length;
    return (...args) => {
        const argLength = args.length || 1;
        if (arity === argLength) {
            return fn(...args);
        }
        const func = (...moreArgs) => fn(...args, ...moreArgs);
        return curry(func, arity - args.length);
    };
};
const apply = (fn) => (...args) => fn(...args);
const tap = (fn) => arg => {
    fn(arg);
    return arg;
};

const pointer = (path) => {
    const parts = path.split('.');
    const partial = (obj = {}, parts = []) => {
        const p = parts.shift();
        const current = obj[p];
        return (current === undefined || current === null || parts.length === 0) ?
            current : partial(current, parts);
    };
    const set = (target, newTree) => {
        let current = target;
        const [leaf, ...intermediate] = parts.reverse();
        for (const key of intermediate.reverse()) {
            if (current[key] === void 0) {
                current[key] = {};
                current = current[key];
            }
        }
        current[leaf] = newTree;
        return target;
    };
    return {
        get(target) {
            return partial(target, [...parts]);
        },
        set
    };
};

const defaultComparator = (a, b) => {
    if (a === b) {
        return 0;
    }
    if (a === undefined) {
        return 1;
    }
    if (b === undefined) {
        return -1;
    }
    return a < b ? -1 : 1;
};
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
    SortDirection["NONE"] = "none";
})(SortDirection || (SortDirection = {}));
const sortByProperty = (prop, comparator) => {
    const propGetter = pointer(prop).get;
    return (a, b) => comparator(propGetter(a), propGetter(b));
};
const defaultSortFactory = (conf) => {
    const { pointer, direction = "asc" /* ASC */, comparator = defaultComparator } = conf;
    if (!pointer || direction === "none" /* NONE */) {
        return (array) => [...array];
    }
    const orderFunc = sortByProperty(pointer, comparator);
    const compareFunc = direction === "desc" /* DESC */ ? swap(orderFunc) : orderFunc;
    return (array) => [...array].sort(compareFunc);
};

var Type;
(function (Type) {
    Type["BOOLEAN"] = "boolean";
    Type["NUMBER"] = "number";
    Type["DATE"] = "date";
    Type["STRING"] = "string";
})(Type || (Type = {}));
const typeExpression = (type) => {
    switch (type) {
        case Type.BOOLEAN:
            return Boolean;
        case Type.NUMBER:
            return Number;
        case Type.DATE:
            return val => new Date(val);
        case Type.STRING:
            return compose(String, val => val.toLowerCase());
        default:
            return val => val;
    }
};
var FilterOperator;
(function (FilterOperator) {
    FilterOperator["INCLUDES"] = "includes";
    FilterOperator["IS"] = "is";
    FilterOperator["IS_NOT"] = "isNot";
    FilterOperator["LOWER_THAN"] = "lt";
    FilterOperator["GREATER_THAN"] = "gt";
    FilterOperator["GREATER_THAN_OR_EQUAL"] = "gte";
    FilterOperator["LOWER_THAN_OR_EQUAL"] = "lte";
    FilterOperator["EQUALS"] = "equals";
    FilterOperator["NOT_EQUALS"] = "notEquals";
    FilterOperator["ANY_OF"] = "anyOf";
})(FilterOperator || (FilterOperator = {}));
const not = fn => input => !fn(input);
const is = value => input => Object.is(value, input);
const lt = value => input => input < value;
const gt = value => input => input > value;
const equals = value => input => value === input;
const includes = value => input => input.includes(value);
const anyOf = value => input => value.includes(input);
const operators = {
    ["includes" /* INCLUDES */]: includes,
    ["is" /* IS */]: is,
    ["isNot" /* IS_NOT */]: compose(is, not),
    ["lt" /* LOWER_THAN */]: lt,
    ["gte" /* GREATER_THAN_OR_EQUAL */]: compose(lt, not),
    ["gt" /* GREATER_THAN */]: gt,
    ["lte" /* LOWER_THAN_OR_EQUAL */]: compose(gt, not),
    ["equals" /* EQUALS */]: equals,
    ["notEquals" /* NOT_EQUALS */]: compose(equals, not),
    ["anyOf" /* ANY_OF */]: anyOf
};
const every = fns => (...args) => fns.every(fn => fn(...args));
const predicate = ({ value = '', operator = "includes" /* INCLUDES */, type }) => {
    const typeIt = typeExpression(type);
    const operateOnTyped = compose(typeIt, operators[operator]);
    const predicateFunc = operateOnTyped(value);
    return compose(typeIt, predicateFunc);
};
// Avoid useless filter lookup (improve perf)
const normalizeClauses = (conf) => {
    const output = {};
    const validPath = Object.keys(conf).filter(path => Array.isArray(conf[path]));
    validPath.forEach(path => {
        const validClauses = conf[path].filter(c => c.value !== '');
        if (validClauses.length > 0) {
            output[path] = validClauses;
        }
    });
    return output;
};
const filter = (filter) => {
    const normalizedClauses = normalizeClauses(filter);
    const funcList = Object.keys(normalizedClauses).map(path => {
        const getter = pointer(path).get;
        const clauses = normalizedClauses[path].map(predicate);
        return compose(getter, every(clauses));
    });
    const filterPredicate = every(funcList);
    return array => array.filter(filterPredicate);
};

const basic = (input) => {
    const { value, scope = [], isCaseSensitive = false } = input;
    const searchPointers = scope.map(field => pointer(field).get);
    if (scope.length === 0 || !value) {
        return (array) => array;
    }
    const test = isCaseSensitive === true ? String(value) : String(value).toLowerCase();
    return (array) => array.filter(item => searchPointers.some(p => {
        const v = isCaseSensitive === true ? String(p(item)) : String(p(item)).toLowerCase();
        return v.includes(test);
    }));
};

function re(strs, ...substs) {
    let reStr = transformRaw(strs.raw[0]);
    for (const [i, subst] of substs.entries()) {
        if (subst instanceof RegExp) {
            reStr += subst.source;
        } else if (typeof subst === 'string') {
            reStr += quoteText(subst);
        } else {
            throw new Error('Illegal substitution: '+subst);
        }
        reStr += transformRaw(strs.raw[i+1]);
    }
    let flags = '';
    if (reStr.startsWith('/')) {
        const lastSlashIndex = reStr.lastIndexOf('/');
        if (lastSlashIndex === 0) {
            throw new Error('If the `re` string starts with a slash, it must end with a second slash and zero or more flags: '+reStr);
        }
        flags = reStr.slice(lastSlashIndex+1);
        reStr = reStr.slice(1, lastSlashIndex);
    }
    return new RegExp(reStr, flags);
}

function transformRaw(str) {
    return str.replace(/\\`/g, '`');
}

/**
 * All special characters are escaped, because you may want to quote several characters inside parentheses or square brackets.
 */
function quoteText(text) {
    return text.replace(/[\\^$.*+?()[\]{}|=!<>:-]/g, '\\$&');
}

const regexp = (input) => {
    const { value, scope = [], escape = false, flags = '' } = input;
    const searchPointers = scope.map(field => pointer(field).get);
    if (scope.length === 0 || !value) {
        return (array) => array;
    }
    const regex = escape === true ? re `/${value}/${flags}` : new RegExp(value, flags);
    return (array) => array.filter(item => searchPointers.some(p => regex.test(String(p(item)))));
};

const emitter = () => {
    const listenersLists = {};
    const instance = {
        on(event, ...listeners) {
            listenersLists[event] = (listenersLists[event] || []).concat(listeners);
            return instance;
        },
        dispatch(event, ...args) {
            const listeners = listenersLists[event] || [];
            for (const listener of listeners) {
                listener(...args);
            }
            return instance;
        },
        off(event, ...listeners) {
            if (event === undefined) {
                Object.keys(listenersLists).forEach(ev => instance.off(ev));
            }
            else {
                const list = listenersLists[event] || [];
                listenersLists[event] = listeners.length ? list.filter(listener => !listeners.includes(listener)) : [];
            }
            return instance;
        }
    };
    return instance;
};
const proxyListener = (eventMap) => ({ emitter }) => {
    const eventListeners = {};
    const proxy = {
        off(ev) {
            if (!ev) {
                Object.keys(eventListeners).forEach(eventName => proxy.off(eventName));
            }
            if (eventListeners[ev]) {
                emitter.off(ev, ...eventListeners[ev]);
            }
            return proxy;
        }
    };
    for (const ev of Object.keys(eventMap)) {
        const method = eventMap[ev];
        eventListeners[ev] = [];
        proxy[method] = function (...listeners) {
            eventListeners[ev] = eventListeners[ev].concat(listeners);
            emitter.on(ev, ...listeners);
            return proxy;
        };
    }
    return proxy;
};

const sliceFactory = ({ page = 1, size } = { page: 1 }) => (array = []) => {
    const actualSize = size || array.length;
    const offset = (page - 1) * actualSize;
    return array.slice(offset, offset + actualSize);
};

var SmartTableEvents;
(function (SmartTableEvents) {
    SmartTableEvents["TOGGLE_SORT"] = "TOGGLE_SORT";
    SmartTableEvents["DISPLAY_CHANGED"] = "DISPLAY_CHANGED";
    SmartTableEvents["PAGE_CHANGED"] = "CHANGE_PAGE";
    SmartTableEvents["EXEC_CHANGED"] = "EXEC_CHANGED";
    SmartTableEvents["FILTER_CHANGED"] = "FILTER_CHANGED";
    SmartTableEvents["SUMMARY_CHANGED"] = "SUMMARY_CHANGED";
    SmartTableEvents["SEARCH_CHANGED"] = "SEARCH_CHANGED";
    SmartTableEvents["EXEC_ERROR"] = "EXEC_ERROR";
})(SmartTableEvents || (SmartTableEvents = {}));
const curriedPointer = (path) => {
    const { get, set } = pointer(path);
    return { get, set: curry(set) };
};
const tableDirective = ({ sortFactory, tableState, data, filterFactory, searchFactory }) => {
    let filteredCount = data.length;
    let matchingItems = data;
    const table = emitter();
    const sortPointer = curriedPointer('sort');
    const slicePointer = curriedPointer('slice');
    const filterPointer = curriedPointer('filter');
    const searchPointer = curriedPointer('search');
    // We need to register in case the summary comes from outside (like server data)
    table.on("SUMMARY_CHANGED" /* SUMMARY_CHANGED */, ({ filteredCount: count }) => {
        filteredCount = count;
    });
    const safeAssign = newState => Object.assign({}, newState);
    const dispatch = curry(table.dispatch, 2);
    const dispatchSummary = (filtered) => {
        matchingItems = filtered;
        return dispatch("SUMMARY_CHANGED" /* SUMMARY_CHANGED */, {
            page: tableState.slice.page,
            size: tableState.slice.size,
            filteredCount: filtered.length
        });
    };
    const exec = ({ processingDelay = 20 } = { processingDelay: 20 }) => {
        table.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
        setTimeout(() => {
            try {
                const filterFunc = filterFactory(filterPointer.get(tableState));
                const searchFunc = searchFactory(searchPointer.get(tableState));
                const sortFunc = sortFactory(sortPointer.get(tableState));
                const sliceFunc = sliceFactory(slicePointer.get(tableState));
                const execFunc = compose(filterFunc, searchFunc, tap(dispatchSummary), sortFunc, sliceFunc);
                const displayed = execFunc(data);
                table.dispatch("DISPLAY_CHANGED" /* DISPLAY_CHANGED */, displayed.map(d => ({
                    index: data.indexOf(d),
                    value: d
                })));
            }
            catch (err) {
                table.dispatch("EXEC_ERROR" /* EXEC_ERROR */, err);
            }
            finally {
                table.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: false });
            }
        }, processingDelay);
    };
    const updateTableState = curry((pter, ev, newPartialState) => compose(safeAssign, tap(dispatch(ev)), pter.set(tableState))(newPartialState));
    const resetToFirstPage = () => updateTableState(slicePointer, "CHANGE_PAGE" /* PAGE_CHANGED */, Object.assign({}, slicePointer.get(tableState), { page: 1 }));
    const tableOperation = (pter, ev) => {
        const fn = compose(updateTableState(pter, ev), resetToFirstPage, () => table.exec() // We wrap within a function so table.exec can be overwritten (when using with a server for example)
        );
        return (arg = {}) => fn(arg);
    };
    const api = {
        sort: tableOperation(sortPointer, "TOGGLE_SORT" /* TOGGLE_SORT */),
        filter: tableOperation(filterPointer, "FILTER_CHANGED" /* FILTER_CHANGED */),
        search: tableOperation(searchPointer, "SEARCH_CHANGED" /* SEARCH_CHANGED */),
        slice: compose(updateTableState(slicePointer, "CHANGE_PAGE" /* PAGE_CHANGED */), () => table.exec()),
        exec,
        async eval(state = tableState) {
            const sortFunc = sortFactory(sortPointer.get(state));
            const searchFunc = searchFactory(searchPointer.get(state));
            const filterFunc = filterFactory(filterPointer.get(state));
            const sliceFunc = sliceFactory(slicePointer.get(state));
            const execFunc = compose(filterFunc, searchFunc, sortFunc, sliceFunc);
            return execFunc(data).map(d => ({ index: data.indexOf(d), value: d }));
        },
        onDisplayChange(fn) {
            table.on("DISPLAY_CHANGED" /* DISPLAY_CHANGED */, fn);
        },
        getTableState() {
            return JSON.parse(JSON.stringify(tableState));
        },
        getMatchingItems() {
            return [...matchingItems];
        }
    };
    const instance = Object.assign(table, api);
    Object.defineProperties(instance, {
        filteredCount: {
            get() {
                return filteredCount;
            }
        },
        length: {
            get() {
                return data.length;
            }
        }
    });
    return instance;
};

const filterListener = proxyListener({ ["FILTER_CHANGED" /* FILTER_CHANGED */]: 'onFilterChange' });
// todo expose and re-export from smart-table-filter
var FilterType;
(function (FilterType) {
    FilterType["BOOLEAN"] = "boolean";
    FilterType["NUMBER"] = "number";
    FilterType["DATE"] = "date";
    FilterType["STRING"] = "string";
})(FilterType || (FilterType = {}));
const filterDirective = ({ table, pointer, operator = "includes" /* INCLUDES */, type = "string" /* STRING */ }) => {
    const proxy = filterListener({ emitter: table });
    return Object.assign({
        filter(input) {
            const newState = this.state();
            if (input === void 0) {
                delete newState[pointer];
            }
            else {
                Object.assign(newState, {
                    [pointer]: [{
                            value: input,
                            operator,
                            type
                        }]
                });
            }
            return table.filter(newState);
        },
        state() {
            return table.getTableState().filter || {};
        }
    }, proxy);
};

const searchListener = proxyListener({ ["SEARCH_CHANGED" /* SEARCH_CHANGED */]: 'onSearchChange' });
const searchDirective = ({ table, scope = [] }) => {
    const proxy = searchListener({ emitter: table });
    return Object.assign(proxy, {
        search(input, opts = {}) {
            return table.search(Object.assign({}, { value: input, scope }, opts));
        },
        state() {
            return table.getTableState().search;
        }
    }, proxy);
};

const sliceListener = proxyListener({
    ["CHANGE_PAGE" /* PAGE_CHANGED */]: 'onPageChange',
    ["SUMMARY_CHANGED" /* SUMMARY_CHANGED */]: 'onSummaryChange'
});
const paginationDirective = ({ table }) => {
    let { slice: { page: currentPage, size: currentSize } } = table.getTableState();
    let itemListLength = table.filteredCount;
    let pageCount = currentSize ? Math.ceil(itemListLength / currentSize) : 1;
    const proxy = sliceListener({ emitter: table });
    const api = {
        selectPage(p) {
            return table.slice({ page: p, size: currentSize });
        },
        selectNextPage() {
            return api.selectPage(currentPage + 1);
        },
        selectPreviousPage() {
            return api.selectPage(currentPage - 1);
        },
        changePageSize(size) {
            return table.slice({ page: 1, size });
        },
        isPreviousPageEnabled() {
            return currentPage > 1;
        },
        isNextPageEnabled() {
            return pageCount > currentPage;
        },
        state() {
            return Object.assign(table.getTableState().slice, { filteredCount: itemListLength, pageCount });
        }
    };
    const directive = Object.assign(api, proxy);
    directive.onSummaryChange(({ page: p, size: s, filteredCount }) => {
        currentPage = p;
        currentSize = s;
        itemListLength = filteredCount;
        pageCount = currentSize ? Math.ceil(itemListLength / currentSize) : 1;
    });
    return directive;
};

const debounce = (fn, time) => {
    let timer = null;
    return (...args) => {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => fn(...args), time);
    };
};
const sortListeners = proxyListener({ ["TOGGLE_SORT" /* TOGGLE_SORT */]: 'onSortToggle' });
const directions = ["asc" /* ASC */, "desc" /* DESC */];
const sortDirective = ({ pointer, table, cycle = false, debounceTime = 0 }) => {
    const cycleDirections = cycle === true ? ["none" /* NONE */].concat(directions) : [...directions].reverse();
    const commit = debounce(table.sort, debounceTime);
    let hit = 0;
    const proxy = sortListeners({ emitter: table });
    const directive = Object.assign({
        toggle() {
            hit++;
            const direction = cycleDirections[hit % cycleDirections.length];
            return commit({ pointer, direction });
        },
        state() {
            return table.getTableState().sort;
        }
    }, proxy);
    directive.onSortToggle(({ pointer: p }) => {
        hit = pointer !== p ? 0 : hit;
    });
    const { pointer: statePointer, direction = "asc" /* ASC */ } = directive.state();
    hit = statePointer === pointer ? (direction === "asc" /* ASC */ ? 1 : 2) : 0;
    return directive;
};

const summaryListener = proxyListener({ ["SUMMARY_CHANGED" /* SUMMARY_CHANGED */]: 'onSummaryChange' });
const summaryDirective = ({ table }) => summaryListener({ emitter: table });

const executionListener = proxyListener({ ["EXEC_CHANGED" /* EXEC_CHANGED */]: 'onExecutionChange' });
const workingIndicatorDirective = ({ table }) => executionListener({ emitter: table });

const defaultTableState = () => ({ sort: {}, slice: { page: 1 }, filter: {}, search: {} });
const smartTable = ({ sortFactory = defaultSortFactory, filterFactory = filter, searchFactory = regexp, tableState = defaultTableState(), data = [] } = {
    sortFactory: defaultSortFactory,
    filterFactory: filter,
    searchFactory: regexp,
    tableState: defaultTableState(),
    data: []
}, ...tableExtensions) => {
    const coreTable = tableDirective({ sortFactory, filterFactory, tableState, data, searchFactory });
    return tableExtensions.reduce((accumulator, newdir) => Object.assign(accumulator, newdir({
        sortFactory,
        filterFactory,
        searchFactory,
        tableState,
        data,
        table: coreTable
    })), coreTable);
};

const loadingIndicator = ({table, el}) => {
    const component = workingIndicatorDirective({table});
    component.onExecutionChange(function ({working}) {
        el.classList.remove('st-working');
        if (working === true) {
            el.classList.add('st-working');
        }
    });
    return component;
};

const sort = ({el, table, conf = {}}) => {
    const pointer = conf.pointer || el.getAttribute('data-st-sort');
    const cycle = conf.cycle || el.hasAttribute('data-st-sort-cycle');
    const component = sortDirective({pointer, table, cycle});
    component.onSortToggle(({pointer: currentPointer, direction}) => {
        el.classList.remove('st-sort-asc', 'st-sort-desc');
        if (pointer === currentPointer && direction !== 'none') {
            const className = direction === 'asc' ? 'st-sort-asc' : 'st-sort-desc';
            el.classList.add(className);
        }
    });
    const eventListener = () => component.toggle();
    el.addEventListener('click', eventListener);
    return component;
};

function debounce$1(fn, delay) {
    let timeoutId;
    return (ev) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            fn(ev);
        }, delay);
    };
}

const filter$1 = ({table, el, delay = 400, conf = {}}) => {
    const pointer = conf.pointer || el.getAttribute('data-st-filter');
    const operator = conf.operator || el.getAttribute('data-st-filter-operator') || 'includes';
    const elType = el.hasAttribute('type') ? el.getAttribute('type') : 'string';
    let type = conf.type || el.getAttribute('data-st-filter-type');
    if (!type) {
        type = ['date', 'number'].includes(elType) ? elType : 'string';
    }
    const component = filterDirective({table, pointer, type, operator});
    const eventListener = debounce$1(ev => component.filter(el.value), delay);
    el.addEventListener('input', eventListener);
    if (el.tagName === 'SELECT') {
        el.addEventListener('change', eventListener);
    }
    return component;
};

const search = ({el, table, delay = 400, conf = {}}) => {
    const scope = conf.scope || (el.getAttribute('data-st-search') || '')
        .split(',')
        .map(s => s.trim());
    const flags = conf.flags || el.getAttribute('data-st-search-flags') || '';
    const component = searchDirective({table, scope});
    const eventListener = debounce$1(() => {
        component.search(el.value, {flags});
    }, delay);
    el.addEventListener('input', eventListener);
};

const table = ({el, table}) => {
    const bootDirective = (factory, selector) => Array.from(el.querySelectorAll(selector)).forEach(el => factory({
        el,
        table
    }));
    // boot
    bootDirective(sort, '[data-st-sort]');
    bootDirective(loadingIndicator, '[data-st-loading-indicator]');
    bootDirective(search, '[data-st-search]');
    bootDirective(filter$1, '[data-st-filter]');

    return table;
};

export { searchDirective as a, paginationDirective as p, smartTable as s, table as t };
//# sourceMappingURL=index-d77c8605.js.map
