const css = "/* Base 64 images */\r\n#fshWorldButtonContainer .huntOn {\r\n  background-image: url('data:image/gif;base64,R0lGODlhKAAoALMAAD+yQH3Kf7zjvxCfEMvpzur17qzcry+rMDCsMGLAY9vv3k64T5fUmh+lIPr7/gCZACH5BAAAAAAALAAAAAAoACgAAASsEL1Jq704T6m7/2AojmRpnmiqrtQSBA2rDYJjO4mMBfd9YICXcAEoFn+eQs8WAAoDDIFiSRVYGROqwxAaELTVyXSZCx0ESrBNMFlYpY7CwOQFF67PAABZqqvBBHN9X39aXHSEhUsofoo3KY2OgieRhQAqAy8JAAZ/lzo1amUyoWBNoH+nMmlghzKFbDqwOgOKOgC2MriFkyq7njIDRsPEvTrHyMnKy8zHHM0bEQA7');\r\n  background-size: contain;\r\n}\r\n\r\n#fshWorldButtonContainer .huntOff {\r\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAVhJREFUWEftl08OQTEQxrkq5xDHkDiDxAUkrEms7IiNFQtWNiTKJxmppm2mpp33IhXNC9qZX7/50+qaTuf1bvELgG0ekK8CSkSoCkrUexew1EDp9Y0ADpZDg8HZnCrg7DA3t/vja/QW/SioGiAUc+Hoc0zJDyDJbj85IeDOOV3PQcBYuIOAo83YICTbyz5o2KcI1tCADdpASD18P9lNg2FmhXh1XCdBEgxACTC20VgesgDhBM5iYQqpaaeArS4BwyYrB7m5RPM4qsK5He5f8pytoG8DHMhY7tm/wZbPhwgQBnNC+opFDJgb0lUxC2BOyGKAuSCLAuaALA4IB9ROqAEj+bnVrALoOvHdYkLA7qmSrUhijT4F0L04VEAom3KGu81aRUFugWCefQNS+9P0V4DYjF1wrQtxBfT1w5QcbETB1Nu6eg5WQIkC0rUqbUYCWQEl6qmdxRLIJyPitjwjlrDgAAAAAElFTkSuQmCC');\r\n  background-size: contain;\r\n}\r\n\r\n#fshWorldButtonContainer .soundOff {\r\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHNSURBVHjaYvz//z8DJQAggJgYKAQAAUS0Ad3dnZFtbS1P0cUBAoiFkMaenm7m////Nfz9+7f4379/nO/9/XOAwpsEN258BJIHCCAMA/r7+6wYGCDh8u/ffwag5oXCwsIqQkJCDOw7doCE04B4GUw9QABhGADUcJSVlQ1EMzABPSgsLMbAxsbBIHnyNIPMqzcgJVeAtr+DqQcIIAwD/v37y2BoaMjw8+cvIPsfw5MnTxhEjx1gkHv9muEdCwsD19+/acjqAQIIw4A/f/4yPH78mOHhw0dgAwwePmTQAWr+xMHBMF+Yn6Fn8vQvyOoBAgiLAX8Yvn79wnDv3j0Gx0+fGHS+f2d4AUwri/l5GX79/YcRyAABhBGNP358ZwClLV+g7Xa/fjG8YWRgqP78meED0CCQ99ABQABhuODnz58MYsePMRh9+MjwnpmFYamUOAMXMDSZgBjkJXQAEEAYLkh68HiO9bsPH5j//b++ho/L5fOvH3dlZCQZxMSEGbAle4AAQjEAmEgMJH798gemnNvs//+bNcxduJeBgVH9+7fvbW/fvPuOLaEBBBDYVGT8zs/PHYh50MVTUxOjgfgZujhAADFSmhsBAoji3AgQYAAwuNxkuZyGCwAAAABJRU5ErkJggg==');\r\n  background-size: 90%;\r\n  background-repeat: no-repeat;\r\n  background-color: #D0B074;\r\n}\r\n\r\n#fshWorldButtonContainer .soundOn {\r\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI9SURBVHjaYvz//z8DJQAggJgYKAQAAYTTgO7uzsi2tpanhAwACCAWdIGenm7m////Nfz9+7f4379/nNg0PcoqTmH48XOb3LwpzwACiKW/v8+KgQESDv/+/WcAal4oLCysIiQkxHDhwnlMzRmF1dxMf1u+fvtxBsg1BQggFqCGo6ysbCCNDExADwkLizGwsXEwfP78heHnj5+omtMLUoE2b/z153cLD8s/k0duIdkAAcTy799fBkNDQ4afP38BXfCP4cmTJwwPHtxi4OPjY/j1C2HAo9T8FG7Gv7OANlf+/vEzn52dcSLDtx+5AAHE8ufPX4bHjx8zPHz4CGzAjx8/GL5+/Qp0DSPD7z+/wZpfBUbfYeDiTv/7/w8Dw7fv7XJbVzA+svaeCHSNOkAAAQ34A9TwheHevXtAG38xfPnyheHbt28MCgpyDLCwAQJBhu8/gNy/QAN+QERA9M+fDAABxPTjx3cGUFoSFhZiEBDgZwB5CWQACIPYICC2fqkwUIMay9/fII2Vjwwc83i4mRkYvv+8CRBALD+Bpty8eY0B5BKQF6SlJSEJBBiiID4MyO1YNf2RmTsj0NmHWBn/XWb4BbT1x8/JAAHE9PfPb+sf339aAw2C4u93ZWQkGcTEhBnQk7ncqZ3TgLaGsgNTz5dHb8/IPb80FSCAGNEVpaUlMf//978JyCxkYGTgnD17PiNGWhDTyWD49XuT3IebzwACCGwLNpyamhgNxM9wycMwQAAxUpobAQKI4twIEGAA+Mk8nL2QZm8AAAAASUVORK5CYII=');\r\n  background-size: 90%;\r\n  background-repeat: no-repeat;\r\n  background-color: #D0B074;\r\n}\r\n\r\n.fshDot {\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: 100%;\r\n  height: 10px;\r\n  width: 10px;\r\n  float: left;\r\n}\r\n\r\n.greenDiamond {\r\n  background-image: url('data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwAcADAD/RAAAACH5BAEAAAAALAAAAAAJAAkAQAIUhBGnqCEPRUJwGvfslS1yGmmOVQAAOw%3D%3D');\r\n}\r\n\r\n.yellowDiamond {\r\n  background-image: url('data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwP3/AAcADAAAACH5BAEAAAAALAAAAAAJAAkAQAIUhCGnqBIPQ0JwGvfslS1yGmmOVQAAOw%3D%3D');\r\n}\r\n\r\n.orangeDiamond {\r\n  background-image: url('data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwP+9AAcADAAAACH5BAEAAAAALAAAAAAJAAkAQAIUhCGnqBIPQ0JwGvfslS1yGmmOVQAAOw%3D%3D');\r\n}\r\n\r\n.offlineDot {\r\n  background-image: url('data:image/gif;base64,R0lGODlhDgAOAMQAAP///1paWnNzc4SEhK2trbW1tZylpWNra3OEhDE5OWNzc73e3rXW1qXGxpy9vZS1tYSlpXucnHOUlFJra2OEhEpjYxghISk5OVJzczlSUkprayExMTFKShgpKRAhIQAAACH5BAEAAAAALAAAAAAOAA4AQAWGICAChCINxihm2WRKiKJl19YBiBY5zNI8CAztMCJsLJ2Ox7MhqAgViiQioUxoBREHQ3E0GD8rzSK6XDicDNqMdIoKGA1mMsuk3hoKxOuAUDQcGykVGBENC4gOEkJnABxREQ8PEBIKFYEeAAoJGRUTdJc1FgIiAx1mZhtHHQMqIgQCHAGtKiEAOw%3D%3D');\r\n}\r\n\r\n.sevenDayDot {\r\n  background-image: url('data:image/gif;base64,R0lGODlhDgAOAMQAAP///0JCQoSEhK2trXNrazEpKZyUnDkpMa1rjJxae5RSc3s5WlopQnMxUmMhQjkIIaWUnGNSWiEQGFIhOSEAEL1zlLVrjIxSa3M5UlIYMUoQKSkAEBgACIRrc2tSWgAAACH5BAEAAAAALAAAAAAOAA4AQAV8ICACENZ1xihqj+YsGMZkxUZJgJc1ilUhicbksYmMBhKKksMpDFQQV2PRcLA2T8Bjl0D8FEIiR0TZPM5n2y0LGDA0cJYmJRpkXopEYmG1pTQTCwkVhHtDGwcAGy4LeQoLbw8UYxFmGRkTl0STBCICSqCgEgIqdQQBEaQqIQA7');\r\n}\r\n\r\n.redDot {\r\n  background-image: url('data:image/gif;base64,R0lGODlhDgAOAMQAAP///62trYyEhL2trUIpKa2UnP9znDEQGP9rjL0hQqUYOXsIIXtSWlIpMf9Sc94xUpQYMa0QMaUIKSkACFIAEHsAGJxCUudSa85CWs45UoRSWnMIGGMAEKVrczkACAAAACH5BAEAAAAALAAAAAAOAA4AQAV7ICAChdV1xSguS5RgWKZAy0YdgBY9juE7sgWHMQocPJSJkhBQFSSJhzQTETYBLYwDYUBcghyPiLKpsFg2z+EKGCgicIk5JXJHHfhHIlKhpCA7PT8YCjUNABVQWg4XhDRJORsLEBAzNDYTHSICFGSeSQcCKiIBDA0MoiohADs%3D');\r\n}\r\n";
const modules_ae2173b2 = {};

const css$1 = ".custombutton[disabled] {\r\n  background: #B8B8B8;\r\n  pointer-events: none;\r\n}\r\n\r\n#fshWorldPrefs img {vertical-align: text-bottom;}\r\n.cR .fshFten {margin: 0.5em 0;}\r\n\r\n/* Scout Tower Titan Tracker & Super Elite Log */\r\n.fshTTracker {\r\n  width: 500px;\r\n  margin: auto;\r\n}\r\n.fshCooldown {\r\n  color: #640000;\r\n}\r\n\r\n/* New Map */\r\n/* #missingBuffs {\r\n  text-align: center;\r\n  margin: 0 0 4px 0;\r\n} */\r\n#fshWorldButtonContainer {\r\n  float: left;\r\n  height: 25.6px;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n#fshWorldButtonContainer > div:first-child {\r\n  margin-right: 0.25em;\r\n}\r\n\r\n.fshToggle {display: flex;}\r\n.fshToggle input {display: none;}\r\n.fshToggle input ~ label:nth-child(2) {display: none;}\r\n.fshToggle input ~ label:nth-child(3) {display: block;}\r\n.fshToggle input:checked ~ label:nth-child(2) {display: block;}\r\n.fshToggle input:checked ~ label:nth-child(3) {display: none;}\r\n\r\n.fshCurveContainer .fshCurveEle {\r\n  background-position: center center;\r\n  border: solid 1px #4f3717;\r\n  border-radius: 2px;\r\n  box-shadow: 0 0 4px #4f3717;\r\n  margin-left: 0.25em;\r\n}\r\n\r\n.fshCurveBtn {\r\n  height: 17px;\r\n  padding: 0;\r\n  width: 17px;\r\n}\r\n\r\n.fshCurveLbl {\r\n  height: 15px;\r\n  width: 15px;\r\n}\r\n\r\n.fshFsty div {font-size: 70%}\r\n.fshFten div {font-size: 11px;}\r\n.fshFten select {\r\n  font-family: 'Open Sans', Helvetica, Arial, sans-serif;\r\n  font-size: 11px;\r\n}\r\n\r\n\r\n/* Settings */\r\n#fshSettingsTable {border-spacing: 10px;}\r\n.networkIcon {display: inline-block;}\r\n.fshHelpTitle {\r\n  font-weight: bold;\r\n  color: #FFF380;\r\n}\r\n\r\n/* Advisor */\r\n.fshSpinnerMsg {\r\n  align-self: center;\r\n}\r\n\r\n/* Bazaar */\r\n.bazaarButton {\r\n  display: inline-block;\r\n  height: 20px;\r\n  width: 20px;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: contain;\r\n  cursor: pointer;\r\n}\r\n.bazaarSelected {\r\n  display: inline-block;\r\n  height: 45px;\r\n  width: 45px;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: contain;\r\n}\r\n\r\n/* Guild Add/Remove Tags */\r\n.guildTagSpinner {\r\n  width: 14px;\r\n  height: 14px;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: contain;\r\n}\r\n\r\n/* Top Lists */\r\n#fshFindOnlinePlayers {\r\n  width: 120px;\r\n  float: right;\r\n  margin: 0 100px 0 0;\r\n  padding: 0;\r\n}\r\n.fshTopListWrap {\r\n  width: 190px;\r\n  display: block;\r\n}\r\n.fshTopListSpinner {\r\n  float: right;\r\n  margin: 0 160px 0 0;\r\n}\r\n\r\n/* Helper Menu */\r\n#content {max-width:600px}\r\n.column {\r\n  float: left;\r\n  width: 180px;\r\n  margin-right: 5px;\r\n}\r\n.column h3 {\r\n  background: #e0e0e0;\r\n  font: bold 13px Arial;\r\n  margin: 0 0 5px 0;\r\n}\r\n.helperMenuDiv {\r\n  cursor: default;\r\n  text-decoration: none;\r\n  text-align: center;\r\n  position: absolute;\r\n  color: black;\r\n  font-size: 12px;\r\n  border-radius: 5px;\r\n  border:3px solid #ccbb77;\r\n  z-index: 1;\r\n  opacity: 0;\r\n  visibility: hidden;\r\n  transition: opacity 100ms linear, visibility 0s linear 100ms;\r\n}\r\n.showMenuDiv {\r\n  opacity: 1;\r\n  visibility: visible;\r\n  transition: opacity 100ms linear, visibility 0s linear;\r\n}\r\n.helperMenuDiv .a-reply {\r\n  cursor: pointer;\r\n  text-decoration: underline;\r\n}\r\n.helperMenu {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  color: yellow;\r\n  font-weight: bold;\r\n  cursor: pointer;\r\n  text-decoration: underline;\r\n  z-index: 100100;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n}\r\n\r\n/* Quick Links */\r\n.fshQuickLinks {\r\n  position: absolute;\r\n  z-index: 100050;\r\n  text-align: left;\r\n  white-space: nowrap;\r\n  color: black;\r\n  font-size: 12px;\r\n  border-radius: 5px;\r\n  border: 3px solid #ccbb77;\r\n  width: 100px;\r\n}\r\n\r\n/* Lists */\r\n.HelperTextLink {\r\n  color: blue;\r\n  font-size: x-small;\r\n  cursor: pointer;\r\n}\r\n.HelperTextLink:hover {text-decoration: underline;}\r\n\r\n/* Profile*/\r\n.quickButton {\r\n  display: inline-block;\r\n  height: 17px;\r\n  width: 17px;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n.fastWorn {\r\n  color: green;\r\n  font-weight: bold;\r\n}\r\n.compDelBtn {\r\n  cursor: pointer;\r\n  text-decoration: underline;\r\n  color: #A0CFEC;\r\n}\r\n\r\n/* General */\r\n.custombutton.fshHide {display: none;}\r\n.no-close .ui-dialog-titlebar-close {display: none;}\r\n.sendLink {\r\n  cursor: pointer;\r\n  text-decoration: underline;\r\n  color: blue;\r\n}\r\n.dropLink {\r\n  cursor: pointer;\r\n  text-decoration: underline;\r\n  color: red;\r\n}\r\n.fshLink {\r\n  cursor: pointer;\r\n  text-decoration: underline;\r\n}\r\n.buffLink {cursor: pointer;}\r\n.fshPoint {cursor: pointer;}\r\n.smallLink {\r\n  cursor: pointer;\r\n  text-decoration: underline;\r\n  color: blue;\r\n  font-size: x-small;\r\n}\r\n.notLink {\r\n  color: grey;\r\n  font-size: x-small;\r\n}\r\n.fshMove {cursor: move;}\r\n\r\n.pCR a {color: #F7EAC9;}\r\n\r\n.fshRed {color: red;}\r\n.fshBlue {color: blue;}\r\n.fshGreen {color: green;}\r\n.fshNavy {color: navy;}\r\n.fshMaroon {color: maroon;}\r\n.fshWhite {color: white;}\r\n.fshGrey {color: grey;}\r\n.fshLime {color: lime;}\r\n.fshYellow {color: yellow;}\r\n.fshPink {color: pink;}\r\n.fshBrown {color: brown;}\r\n.fshDarkCyan {color: DarkCyan;}\r\n.fshOliveDrab {color: OliveDrab;}\r\n.fshDodgerBlue {color: DodgerBlue;}\r\n.fshPowderBlue {color: PowderBlue;}\r\n.fshLightSkyBlue {color: LightSkyBlue;}\r\n.fshPaleVioletRed {color: PaleVioletRed;}\r\n.fshRed a {color: red;}\r\n.fshGreen a {color: green;}\r\n.fshYellow a {color: yellow;}\r\n.fshDarkCyan a {color: DarkCyan;}\r\n.fshOliveDrab a {color: OliveDrab;}\r\n.fshPaleVioletRed a {color: PaleVioletRed;}\r\n.fshHeader {background-color: #CD9E4B;}\r\n.fshBlack {background-color: black;}\r\n.fshVerySoftOrange {background-color: #e2b960;}\r\n.fshBtnBox {\r\n  font-size: x-small;\r\n  text-align: right;\r\n}\r\n.fshBkRed {background-color: red;}\r\n\r\n.fshCommon {color: white;}\r\n.fshRare {color: #3366ff;}\r\n.fshUnique {color: #cc33ff;}\r\n.fshLegendary {color: #ffff40;}\r\n.fshSuper {color: #ff0000;}\r\n.fshCrystal {color: #6633ff;}\r\n.fshEpic {color: #009933;}\r\n\r\n.fshVMid {vertical-align: middle;}\r\n.fshCenter {text-align: center;}\r\n.fshTblCenter {margin: 0 auto;}\r\n.fshRight {text-align: right;}\r\n.fshHide {display: none;}\r\n.fshWearHide {display: none;}\r\n.fshInline {display: inline;}\r\n.fshBlock {display: inline-block;}\r\n.fshNoWrap {white-space: nowrap;}\r\n.fshBold {font-weight: bold;}\r\n.quickCreate {\r\n  display: inline-block;\r\n  height: 1.2em;\r\n  margin-left: 0.4em;\r\n  position: relative;\r\n  width: 6.5em;\r\n}\r\n.fshFixed {position: fixed;}\r\n.fshRelative {position: relative;}\r\n.fshXSmall {font-size: x-small;}\r\n.fshXXSmall {font-size: xx-small;}\r\n.fshSmall {font-size: small;}\r\n.fshFloatLeft {float: left;}\r\n.fshFloatRight {float: right;}\r\n.fshFlex {display: flex;}\r\n.fshAdvRank {\r\n  width: 62px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n.fshBreakAll {word-break: break-all}\r\n\r\n/* Shoutbox Preview Table */\r\n.sbpTbl {\r\n  width: 325px;\r\n  margin: 0 auto;\r\n}\r\n/* Shoutbox Preview Header */\r\n.sbpHdr {\r\n  text-align: center;\r\n  color: #7D2252;\r\n  background-color: #CD9E4B;\r\n}\r\n/* Shoutbox Preview Msg */\r\n.sbpMsg {\r\n  width: 325px;\r\n  display: inline-block;\r\n  overflow-wrap: break-word;\r\n  font-size: 11px;\r\n}\r\n\r\n#fshAllyEnemy .fshHide {display: none;}\r\n#fshAllyEnemy .fshWhite {color: white;}\r\n#fshAllyEnemy .fshRed {color: red;}\r\n#fshAllyEnemy .fshDodgerBlue {color: DodgerBlue;}\r\n#fshAllyEnemy .fshPowderBlue {color: PowderBlue;}\r\n#fshAllyEnemy .fshLightSkyBlue {color: LightSkyBlue;}\r\n#fshAllyEnemy .fshPaleVioletRed {color: PaleVioletRed;}\r\n#fshAllyEnemy .fshPink {color: pink;}\r\n\r\n#minibox-guild-members-list .fshGreen {color: green;}\r\n#minibox-guild-members-list .fshWhite {color: white;}\r\n#minibox-guild-members-list .fshGrey {color: grey;}\r\n#minibox-guild-members-list .fshHide {display: none;}\r\n#minibox-allies-list .fshDodgerBlue {color: DodgerBlue;}\r\n#minibox-allies-list .fshLightSkyBlue {color: LightSkyBlue;}\r\n#minibox-allies-list .fshPowderBlue {color: PowderBlue;}\r\n#minibox-allies-list .fshHide {display: none;}\r\n\r\n.fastPray {text-align: center;}\r\n.fastPray table {\r\n  float: left;\r\n}\r\n.fastPray td {padding: 1px;}\r\n.fastPray span {\r\n  cursor: pointer;\r\n  display: inline-block;\r\n  height: 16px;\r\n  width: 16px;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n.quickbuffTable {margin: 0 auto;}\r\n.quickbuffTableHeader {\r\n  text-align: center;\r\n  padding: 0 4px;\r\n  color: orange;\r\n}\r\n.quickbuffTableDetail {\r\n  text-align: center;\r\n  padding: 0 4px;\r\n}\r\n.quickbuffActivate {\r\n  cursor: pointer;\r\n  color: red;\r\n}\r\n\r\n#quickbuff .player h1 {float: left;}\r\n#quickbuff .player p {clear: both;}\r\n\r\n.fshBuffOn {color: white; font-size: x-small;}\r\n.fshLastActivity {color: #cccccc; font-size: x-small;}\r\n#quickbuff #buff-outer .fshDim span {\r\n  color: #999999;\r\n}\r\n\r\n.profile-stat-bonus {font-size: x-small;}\r\n#minibox-enemy {margin: 0 0 10px; overflow: hidden}\r\n#fshResetEnemy {\r\n  font-size: xx-small;\r\n  cursor: pointer;\r\n  text-decoration: underline;\r\n}\r\n.enemy-send-message {\r\n  cursor: pointer;\r\n  background-position: -198px -80px;\r\n}\r\n.enemy-quickbuff {\r\n  cursor: pointer;\r\n  background-position: -210px -80px;\r\n}\r\n.enemy-secure-trade {background-position: -222px -80px;}\r\n.enemy-trade {background-position: -234px -80px;}\r\n.player-row {white-space: nowrap}\r\n#fshAllyEnemy .enemy-quick-buff {\r\n  clear: both;\r\n  text-align: center;\r\n  font-size: 11px;\r\n  margin: 0;\r\n  padding-top: 5px;\r\n  color: #F7EAC9;\r\n  text-decoration: underline;\r\n  cursor: pointer;\r\n}\r\n.enemy-buff-check-on,\r\n.enemy-buff-check-off {\r\n  display: inline-block;\r\n  width: 12px;\r\n  height: 12px;\r\n  margin: 0 1px 2px 0;\r\n  vertical-align: bottom;\r\n  background: transparent url('https://cdn2.fallensword.com/ui/misc/icons.png');\r\n  cursor: pointer;\r\n}\r\n.enemy-buff-check-off {\r\n  background-position: -246px -80px;\r\n}\r\n.enemy-buff-check-on {\r\n  background-position: -270px -80px;\r\n}\r\n\r\n.fshMoveItem {\r\n  font-size: xx-small;\r\n  border: none;\r\n  height: 11px;\r\n}\r\n\r\n#fshBazaar {font-size: x-small;}\r\n#fshBazaar #fshBazaarWarning {\r\n  color: red;\r\n  font-size: small\r\n}\r\n\r\n/* Relic */\r\n\r\n#dialog-relic .fshRelicLeftDiv {\r\n  width: 100px;\r\n  margin-right: 10px;\r\n}\r\n#dialog-relic .fshRelicMidDiv {\r\n  width: 160px;\r\n  margin-right: 10px;\r\n}\r\n.fshRelicRightDiv {\r\n  width: 160px;\r\n}\r\n#dialog-relic .fshRelicLowDiv {\r\n  width: 455px;\r\n  padding-top: 10px;\r\n}\r\n.fshRelicLowDiv a {\r\n  color: red;\r\n}\r\n.relicT th {border-top: 2px black solid;}\r\n.relicT td {font-size: x-small;}\r\n.relicT td, .relicT th {text-align: right;}\r\n.relicS td:nth-child(1) {color: brown;}\r\n.relicS td:nth-child(1), .relicS th:nth-child(1) {width: 112px;}\r\n.relicS td:nth-child(2), .relicS th:nth-child(2) {width: 46px;}\r\n\r\n/* Online Players */\r\n.fshImgCntr {\r\n  display: block;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n\r\n.lvlHighlight {background-color: #4671C8;}\r\n.lvlGvGHighlight {background-color: #FF9900;}\r\n\r\n.fshInvFilter {\r\n  width: 100%;\r\n}\r\n.fshInvFilter th {\r\n  background-color: #cd9e4b;\r\n}\r\n\r\n#fshInv_filter input {width: 200px}\r\n\r\n.fshNumberInput {width: 3em;}\r\n\r\n.text-input-wrapper {\r\n  border: 1px solid;\r\n  padding: 1px 6px 1px 1px;\r\n  display: inline-block;\r\n  background: white;\r\n}\r\n.text-input-wrapper input {\r\n  border: none;\r\n}\r\n.text-input-wrapper span {\r\n  cursor: pointer;\r\n  color: blue;\r\n  font-weight: bold;\r\n}\r\n\r\n/* Recipe Manager */\r\n\r\n.rmTh {background-color: #ddd;}\r\n.rmTh th {text-align: center;}\r\n.rmTr {\r\n  vertical-align: middle;\r\n  text-align: center;\r\n}\r\n.rmTd {border-bottom: 1px solid #CD9E4B;}\r\n.rmTd img {margin: 0 auto;}\r\n.rmItem {\r\n  display: inline-block;\r\n  margin: 0 3px;\r\n}\r\n.rmItem p {margin: 0;}\r\n\r\n/* New World Shop Multi Buy */\r\n.fshClear {clear: both;}\r\n\r\n/* Button as Link */\r\n.fshBl {\r\n  background: transparent;\r\n  border: none;\r\n  color: blue;\r\n  cursor: pointer;\r\n  font-family : inherit;\r\n  margin: 0;\r\n  padding: 0;\r\n  text-decoration: underline;\r\n  user-select: text;\r\n}\r\nbutton::-moz-focus-inner {\r\n  border: 0;\r\n  padding: 0;\r\n}\r\n.fshBl.fshBls {font-size: 84%;}\r\n\r\n/* Create Auction Craft Buttons */\r\n.fshAC {\r\n  margin: 10px auto 10px auto;\r\n  text-align: center;\r\n}\r\n\r\n/* Composing Potion*/\r\n.fshPot {\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n/* Success Msg */\r\n.fshScs {height: 26px;}\r\n\r\n/* New Row */\r\n.fshNr {\r\n  background-color: #F5F298;\r\n}\r\n/* Old Row */\r\n.fshOr {\r\n  background-color: #CD9E4B;\r\n}\r\n\r\n/* AH Quick Search - Category Header */\r\n.fshQs {\r\n  font-weight: bold;\r\n  font-size: large;\r\n}\r\n\r\n/* Quick Extract */\r\n.qeHead {\r\n  background-color: #CD9E4B;\r\n  width: 100%;\r\n}\r\n\r\n/* Find Buffs & Other */\r\n\r\n.fshFind {\r\n  width: 620px;\r\n  border-collapse: collapse;\r\n  margin: 0 auto;\r\n}\r\n\r\n.headCell {\r\n  width: 50%;\r\n}\r\n\r\n.findLabel {\r\n  text-align: right;\r\n  color: brown;\r\n}\r\n\r\n.leftLabel {\r\n  text-align: right;\r\n  color: brown;\r\n  width: 30%;\r\n}\r\n\r\n.extraProfile {\r\n  width: 118px;\r\n}\r\n\r\n.selectOnline {\r\n  width: 140px;\r\n}\r\n\r\n.disclaim {\r\n  font-size: xx-small;\r\n  color: brown;\r\n  margin-left: 28px;\r\n  margin-right: 28px;\r\n}\r\n\r\n.buffProg {\r\n  width: 310px;\r\n}\r\n\r\n.nameCol {\r\n  width: 120px;\r\n}\r\n\r\n.infoCol {\r\n  width: 200px;\r\n}\r\n\r\n.fshResult {\r\n  width: 620px;\r\n  border-collapse: collapse;\r\n  margin: 0 auto;\r\n  border-width: 1px;\r\n  border-style: solid;\r\n  border-color: gray black black gray;\r\n}\r\n\r\n.fshResult > tbody > tr > th, .fshResult > tbody > tr > td {\r\n  padding: 2px;\r\n  border-width: 1px;\r\n  border-style: solid;\r\n  border-color: black gray gray black;\r\n}\r\n\r\n.resAct {\r\n  color: gray;\r\n  text-align: right;\r\n  width: 50%;\r\n}\r\n\r\n.resLbl {\r\n  color: gray;\r\n  text-align: right;\r\n  width: 25%;\r\n}\r\n\r\n.resVal {\r\n  width: 25%\r\n}\r\n\r\n/* End of Find Buffs & Other */\r\n\r\n/* ClearFix */\r\n.nav-link:after, .nav-level-1:after, .nav-level-2:after {\r\n  content: '';\r\n  display: table;\r\n  clear: both;\r\n}\r\n\r\n/* Stop resizable textareas */\r\ntextarea {resize: none;}\r\n\r\n/* Quick Extract and Inventing results */\r\n.fshNbrList {list-style: decimal inside;}\r\n\r\n/* topbanner-stats */\r\n#topbanner-stats a {color: #F7EAC9;}\r\n\r\n/* Spoils of War */\r\n#fshScoutTower {\r\n  height: 21px;\r\n  width: 21px;\r\n}\r\n\r\n";
const modules_0a74b28e = {};

const css$2 = ".fshFormGroup {background-image: url('https://cdn2.fallensword.com/ui/world/icon_action_formgroup.png');}\r\n.fshQuickBuff {background-image: url('https://cdn2.fallensword.com/ui/world/icon_action_quickbuff.png');}\r\n.fshRealmMap {background-image: url('https://cdn2.fallensword.com/ui/world/icon_action_map.png');}\r\n.fshTempleZero {background-image: url('https://cdn2.fallensword.com/temple/0.png');}\r\n.fshTempleOne {background-image: url('https://cdn2.fallensword.com/temple/1.png');}\r\n.fshTempleTwo {background-image: url('https://cdn2.fallensword.com/temple/2.png');}\r\n.fshTempleThree {background-image: url('https://cdn2.fallensword.com/temple/3.png');}\r\n.fshOldSpinner {background-image: url('https://cdn2.fallensword.com/ui/world/action_spinner.gif')}\r\n.fshInnerBg {background-image: url('https://cdn2.fallensword.com/ui/misc/inner_bg.png');}\r\n.fshJoin {background-image: url('https://cdn2.fallensword.com/ui/world/icon_action_join.png');}\r\n.fshGold {background-image: url('https://cdn2.fallensword.com/currency/0.png');}\r\n.fshWiki {background-image: url('https://cdn2.fallensword.com/ui/misc/wiki.png');}\r\n";
const modules_2331501e = {};

const css$3 = "[data-tooltip] {\n  position: relative;\n  display: inline-block;\n}\n\n[data-tooltip]:before, [data-tooltip]:after {\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, -12px);\n  z-index: 1000;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  opacity: 0;\n  transition: opacity .35s ease .25s;\n}\n\n[data-tooltip]:before {\n  content: attr(data-tooltip);\n  background: #333;\n  color: #eee;\n  padding: 8px 12px;\n  white-space: nowrap;\n  bottom: 100%;\n  border-radius: 3px;\n  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.65);\n}\n\n[data-tooltip]:after {\n  content: '';\n  background: transparent;\n  border: 8px solid transparent;\n  border-top-color: #333;\n}\n\n[data-tooltip]:hover:before, [data-tooltip]:hover:after, [data-tooltip]:focus:before, [data-tooltip]:focus:after, [data-tooltip]:active:before, [data-tooltip]:active:after {\n  opacity: 1;\n}\n\n[data-tooltip].tooltip-multiline:before {\n  width: 100vw;\n  max-width: 240px;\n  white-space: normal;\n}\n\n[data-tooltip][class*=\"tooltip-bottom\"]:before, [data-tooltip][class*=\"tooltip-bottom\"]:after {\n  transform: translate(-50%, 12px);\n}\n\n[data-tooltip][class*=\"tooltip-bottom\"]:before {\n  bottom: auto;\n  top: 100%;\n}\n\n[data-tooltip][class*=\"tooltip-bottom\"]:after {\n  bottom: 0;\n  border: 8px solid transparent;\n  border-bottom-color: #333;\n}\n\n[data-tooltip].tooltip-bottom-left:before {\n  transform: translate(-24px, 12px);\n}\n\n[data-tooltip].tooltip-bottom-right:before {\n  left: auto;\n  right: 50%;\n  transform: translate(24px, 12px);\n}\n\n[data-tooltip].tooltip-top-left:before {\n  transform: translate(-24px, -12px);\n}\n\n[data-tooltip].tooltip-top-right:before {\n  left: auto;\n  right: 50%;\n  transform: translate(24px, -12px);\n}\n";
const modules_89f385fc = {};

const css$4 = "/* Mailbox & Crafting & Forging */\r\n.fshTakeGrid,\r\n.fshItemGrid {\r\n  display: grid;\r\n  grid-gap: 2px;\r\n  grid-template-columns: repeat(9, 60px);\r\n  justify-content: center;\r\n}\r\n\r\n.fshItemGrid div,\r\n.fshTakeGrid div div:nth-child(1) {\r\n  align-items: center;\r\n  background: url('https://cdn2.fallensword.com/ui/inventory/2x3.png');\r\n  display: flex;\r\n  height: 90px;\r\n  justify-content: center;\r\n  width: 60px;\r\n}\r\n";
const modules_bf79807f = {};

const css$5 = "/* https://stephanwagner.me/only-css-loading-spinner */\r\n/* Requires position: relative, absolute or fixed */\r\n@-webkit-keyframes fshSpinner {\r\n  to {\r\n    -webkit-transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n@keyframes fshSpinner {\r\n  to {\r\n    -webkit-transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n.fshSpinner:before {\r\n  content: '';\r\n  box-sizing: border-box;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: 20px; /* TODO Find most common values here */\r\n  height: 20px; /* TODO Find most common values here */\r\n  margin-top: -10px; /* TODO Find most common values here */\r\n  margin-left: -10px; /* TODO Find most common values here */\r\n  border-radius: 50%;\r\n  border: 2px solid #ccc;\r\n  border-top-color: #07d;\r\n  -webkit-animation: fshSpinner .6s linear infinite;\r\n  animation: fshSpinner .6s linear infinite;\r\n}\r\n.fshSpinner64:before {\r\n  width: 64px;\r\n  height: 64px;\r\n  margin-top: -32px;\r\n  margin-left: -32px;\r\n  border-width: 4px;\r\n}\r\n.fshSpinner12:before {\r\n  width: 12px;\r\n  height: 12px;\r\n  margin-top: -6px;\r\n  margin-left: -6px;\r\n}\r\n.fshSpin12:before {\r\n  width: 12px;\r\n  height: 12px;\r\n}\r\n.fshComposingSpinner:before {\r\n  top: 75%;\r\n}\r\n";
const modules_0c547ad1 = {};

function fallback(a, b) {
  return a || b;
}

const isArray = (e) => Array.isArray(e);

function isFunction(e) { return typeof e === 'function'; }

function isUndefined(e) { return typeof e === 'undefined'; }

function on(target, type, listener, options) {
  if (target instanceof EventTarget) {
    target.addEventListener(type, listener, options);
  }
}

function parseStack(e) {
  const concatStack = e.stack.replace(/\n +/g, '|');
  if (e.stack.includes(e.message)) {
    return concatStack;
  }
  return `${e.message}|${concatStack}`;
}

function isError(e) {
  if (e.stack) { return parseStack(e); }
  if (e.message) { return e.message; }
  return String(e);
}

function parseError(e) {
  if (e instanceof Error) { return isError(e); }
  return String(e);
}

var calf = {};

function getElementById(id, doc) {
  if (doc) { return doc.getElementById(id); }
  return document.getElementById(id);
}

function insertHtml(parent, where, html) {
  if (parent instanceof Element) {
    parent.insertAdjacentHTML(where, html);
  }
}

function insertHtmlBeforeEnd(parent, html) {
  insertHtml(parent, 'beforeend', html);
}

const timers = {};
let footWrap;

function getFootWrap() {
  if (!footWrap) { footWrap = getElementById('foot-wrap'); }
  return footWrap;
}

function log(text, value) {
  if (getFootWrap()) {
    insertHtmlBeforeEnd(footWrap,
      `<br>${text}: ${value} (${typeof value})`);
  }
}

function time(name) {
  if (name) { timers[name] = performance.now() * 1000; }
}

function timeEnd(name) {
  if (timers[name]) {
    log(name, `${Math.round(performance.now() * 1000
      - timers[name]) / 1000}ms`);
    delete timers[name];
  }
}

function getText(node) {
  if (node instanceof Node) {
    return node.textContent;
  }
}

let thePlayerId;

function playerId() {
  if (!thePlayerId) {
    thePlayerId = Number(
      getText(getElementById('holdtext'))
        .match(/fallensword.com\/\?ref=(\d+)/)[1],
    );
  }
  return thePlayerId;
}

const times = {};
const refAry = ['pagereboot.com', 'refreshthing.com', 'refreshthis.com',
  'lazywebtools.co.uk'];
const urlPatch = [
  [/&m=.*/],
  [/&subcmd=&.*/],
  [/&subcmd2=&.*/],
  [/&[a-z_]+_id=.+/],
  [/&id=.+/],
  [/&target_player=.+/],
  [/&[a-z]+_username=.+/],
  [/\?cmd=auctionhouse.+/, '?cmd=auctionhouse'],
  [/&subcmd=[0-9a-f]{32}/],
  [/&search_active=.+/],
  [/&letter=.+/],
  [/&guild_name=.+/],
  [/&user=.+/],
  [/&[a-z_]*page=.+/],
  [/&prestige=.+/],
  [/&withdraw_amount=.+/],
  [/&amount=.+/],
  [/&tickets=.+/],
  [/&search=.+/],
  [/&target=.+/],
  [/&xcv=[0-9a-f]{32}/],
  [/\?ref=[0-9]+/],
];

let autoRefferer = false;
let haveRefferer = false;

function isAuto() {
  if (!haveRefferer) {
    const referrer = document.referrer
      .match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    let docRef;
    if (referrer) { [, docRef] = referrer; }
    autoRefferer = refAry.includes(docRef);
    haveRefferer = true;
  }
  return autoRefferer;
}

function noGa() {
  return isAuto() || isUndefined(window.ga);
}

function start(category, variable, label) {
  if (noGa()) { return; }
  times[`${category}:${variable}:${label}`] = performance.now() * 1000;
}

function sendTiming(category, variable, label) {
  const myTime = Math.round(performance.now() * 1000
    - times[`${category}:${variable}:${label}`]) / 1000;
  if (myTime > 10) {
    ga('fshApp.send', 'timing', category, variable, Math.round(myTime),
      label);
  }
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    log(variable, `${myTime}ms`);
  }
}

function end(category, variable, label) {
  if (noGa()) { return; }
  sendTiming(category, variable, label);
}

function stripExtra(acc, curr) {
  return acc.replace(curr[0], curr[1] || '');
}

function fixupUrl() {
  const origPath = window.location.pathname + window.location.search;
  const page = urlPatch.reduce(stripExtra, origPath);
  ga('fshApp.set', 'screenName', page);
  ga('fsh.set', 'page', page);
}

function setup() {
  if (noGa()) { return; }
  ga('create', 'UA-76488113-1', 'auto', 'fshApp', {
    userId: playerId(),
    siteSpeedSampleRate: 10,
  });
  ga('fshApp.set', 'appName', 'fshApp');
  ga('fshApp.set', 'appVersion', `${calf.fshVer}(${calf.calfVer})`);
  ga('create', 'UA-76488113-2', 'auto', 'fsh', {
    userId: playerId(),
    siteSpeedSampleRate: 10,
  });
  fixupUrl();
  ga('fsh.send', 'pageview');
}

function screenview(funcName) {
  if (noGa()) { return; }
  ga('fshApp.set', 'screenName', funcName);
  ga('fshApp.send', 'screenview');
}

function sendEvent(eventCategory, eventAction, eventLabel) {
  if (noGa()) { return; }
  ga('fshApp.send', 'event', eventCategory, eventAction, eventLabel);
}

function sendException(desc, fatal) {
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  sendException
    // eslint-disable-next-line no-console
    console.log('sendException', desc);
  }
  if (noGa()) { return; }
  ga('fshApp.send', 'exception', {
    exDescription: desc,
    exFatal: fatal,
  });
}

/*
Based on
fiddle.jshell.net/GRIFFnDOOR/r7tvg/
*/

const heap = [null];

function cmp(i, j) {
  return heap[i] && heap[i].priority < heap[j].priority;
}

function swp(i, j) {
  const temp = heap[i];
  heap[i] = heap[j];
  heap[j] = temp;
}

function calcChildIndex(leftHigher, i) {
  if (leftHigher) { return i * 2; }
  return i * 2 + 1;
}

function sink(j) {
  let i = j;
  while (i * 2 < heap.length) {
    const leftHigher = !cmp(i * 2 + 1, i * 2);
    const childIndex = calcChildIndex(leftHigher, i);
    if (cmp(i, childIndex)) { break; }
    swp(i, childIndex);
    i = childIndex;
  }
}

function bubble(j) {
  let i = j;
  while (i > 1) {
    // eslint-disable-next-line no-bitwise
    const parentIndex = i >> 1;
    if (!cmp(i, parentIndex)) { break; }
    swp(i, parentIndex);
    i = parentIndex;
  }
}

function pop() {
  if (heap.length === 1) { return; }
  const topVal = heap[1].data;
  const last = heap.pop();
  if (heap.length > 1) {
    heap[1] = last;
    sink(1);
  }
  return topVal;
}

function push(data, priority) {
  bubble(heap.push({ data, priority }) - 1);
}

function getLength() {
  return heap.length - 1;
}

let paused = true;
const message = 'fshMessage';
let messageHandler;

function taskRunner() {
  if (getLength() === 0) {
    paused = true;
  } else {
    paused = false;
    window.postMessage(message, '*');
  }
}

function popError(fn) {
  if (!isUndefined(fn)) {
    sendException(`pop() was not a function (${typeof fn})`, false);
  }
}

function testPop() {
  const testFn = pop();
  if (isFunction(testFn)) {
    testFn();
  } else { popError(testFn); }
}

function asyncTask() {
  try {
    testPop();
  } catch (e) {
    sendException(parseError(e), false);
  } finally {
    taskRunner();
  }
}

function callback(event) {
  const key = event.data;
  if (typeof key === 'string' && key.indexOf(message) === 0) {
    asyncTask();
  }
}

function initMessageHandler() {
  if (!messageHandler) {
    on(window, 'message', callback);
    messageHandler = true;
  }
}

function devLog(args) {
  if (args && !isArray(args)) {
    // eslint-disable-next-line no-console
    console.log('addTask isArray(args)', isArray(args));
  }
}

function add(priority, fn, args, scope) {
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  Not sending args as Array
    devLog(args);
  }
  if (isFunction(fn)) {
    initMessageHandler();
    const scopeGuard = fallback(scope, window);
    const argsGuard = fallback(args, []);
    push(fn.bind(scopeGuard, ...argsGuard), priority);
    if (paused) { taskRunner(); }
  }
}

function off(target, type, listener, options) {
  if (target instanceof EventTarget) {
    target.removeEventListener(type, listener, options);
  }
}

function isBoolean(e) { return typeof e === 'boolean'; }

function listenerOptions(options) {
  if (isBoolean(options)) {
    return { capture: options };
  }
  return options;
}

function once(target, type, listener, addOptions) {
  on(target, type, listener, { once: true, ...listenerOptions(addOptions) });
}

function partial(fn, ...outer) {
  return (...inner) => fn(...outer, ...inner);
}

let dragTarget;
let mouseX;
let mouseY;
let offsetX;
let offsetY;
let timer;

function setDragTarget(parent, event) {
  if (parent) {
    dragTarget = parent;
  } else {
    dragTarget = event.target;
  }
}

function setMouseCoord(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function getTransformXY(trans) {
  if (trans === 'none') { return [0, 0]; }
  const matrix = trans.match(/(\d+), (\d+), (\d+), (\d+), (-?\d+), (-?\d+)/);
  return [Number(matrix[5]), Number(matrix[6])];
}

function setOffsets() {
  const style = window.getComputedStyle(dragTarget, null);
  const transformXY = getTransformXY(style.transform);
  offsetX = transformXY[0] - mouseX;
  offsetY = transformXY[1] - mouseY;
}

function drawElement(event) {
  if (event.clientX !== mouseX || event.clientY !== mouseY) {
    dragTarget.style.transform = `matrix(1, 0, 0, 1, ${(event.clientX + offsetX).toString()
    }, ${(event.clientY + offsetY).toString()})`;
    setMouseCoord(event);
  }
}

function checkInterval(event) {
  const now = performance.now();
  if (now - timer > 16) {
    drawElement(event);
    timer = now;
  }
}

function dragOver(event) {
  checkInterval(event);
  event.preventDefault();
  return false;
}

function dragDrop(event) {
  drawElement(event);
  off(document.body, 'dragover', dragOver);
  event.preventDefault();
  return false;
}

function setDragImage(event) {
  const img = new Image();
  img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  event.dataTransfer.setDragImage(img, 0, 0);
}

function dragStart(parent, event) {
  setDragTarget(parent, event);
  setDragImage(event);
  setMouseCoord(event);
  setOffsets();
  timer = 0;
  event.dataTransfer.setData('text/plain', '');
  on(document.body, 'dragover', dragOver);
  once(document.body, 'drop', dragDrop);
}

function draggable(element, parent) {
  // eslint-disable-next-line no-param-reassign
  element.draggable = true;
  on(element, 'dragstart', partial(dragStart, parent));
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const server = `${document.location.protocol}//${
  document.location.host}/`;
const cdn = window.HCS && window.HCS.defines && window.HCS.defines.cdn;

const rarity = [
  { colour: '#ffffff', clas: 'fshCommon' },
  { colour: '#0099ff', clas: 'fshRare' },
  { colour: '#cc00ff', clas: 'fshUnique' },
  { colour: '#ffff33', clas: 'fshLegendary' },
  { colour: '#cc0033', clas: 'fshSuper' },
  { colour: '#6633ff', clas: 'fshCrystal' },
  { colour: '#009900', clas: 'fshEpic' },
];

const places = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth',
  'fourteenth'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'];

const mercRE = [
  /<td>Attack:<\/td><td>(\d+)<\/td>/,
  /<td>Defense:<\/td><td>(\d+)<\/td>/,
  /<td>Armor:<\/td><td>(\d+)<\/td>/,
  /<td>Damage:<\/td><td>(\d+)<\/td>/,
  /<td>HP:<\/td><td>(\d+)<\/td>/,
];

const lastActivityRE = /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/;
const playerIDRE = /player_id=(\d+)/;
const itemRE = /item_id=(\d+)&inv_id=(\d+)/;
const guildRE = /guild_id=(\d+)/;

const defenderMultiplier = 0.2;

const defJoinallgroupsundersize = 'joinallgroupsundersize';

const indexPhp = 'index.php';
const defCmd = '?cmd=';
const cmdUrl = `${indexPhp}${defCmd}`;
const defSubcmd = '&subcmd=';
const defTargetUsername = '&target_username=';
const notepadBlank = `${defCmd}notepad&blank=1${defSubcmd}`;
const newGuildLogLoc = `${notepadBlank}newguildlog`;
const newGuildLogUrl = `${indexPhp}${newGuildLogLoc}`;
const auctionhouseUrl = `${cmdUrl}auctionhouse`;
const ahSearchUrl = `${auctionhouseUrl}&search=`;
const logUrl = `${cmdUrl}log`;
const doAddIgnore = `${logUrl}${defSubcmd}doaddignore&ignore_username=`;
const profileUrl = `${cmdUrl}profile`;
const playerIdUrl = `${profileUrl}&player_id=`;
const dropItemsUrl = `${profileUrl}${defSubcmd}dropitems`;
const tradeUrl = `${cmdUrl}trade&target_player=`;
const secureUrl = `${cmdUrl}trade${defSubcmd}createsecure${
  defTargetUsername}`;
const arenaUrl = `${cmdUrl}arena${defSubcmd}`;
const notepadBlankUrl = `${indexPhp}${notepadBlank}`;
const auctionSearchUrl = `${notepadBlankUrl}auctionsearch`;
const pointsUrl = `${cmdUrl}points`;
const guildSubcmdUrl = `${cmdUrl}guild${defSubcmd}`;
const guildLogUrl = `${guildSubcmdUrl}log`;
const scouttowerUrl = `${guildSubcmdUrl}scouttower`;
const groupsSubcmdUrl = `${guildSubcmdUrl}groups&subcmd2=`;
const recallUserUrl = `${guildSubcmdUrl}inventory&subcmd2=report&user=`;
const guildViewUrl = `${guildSubcmdUrl}view&guild_id=`;
const joinallUrl = `${groupsSubcmdUrl}joinall`;
const joinUnderUrl = `${groupsSubcmdUrl}${defJoinallgroupsundersize}`;
const worldUrl = `${cmdUrl}world`;
const searchPlayerUrl = `${cmdUrl}findplayer`;
const showPlayerUrl = `${searchPlayerUrl
}&search_show_first=1&search_username=`;
const blacksmithUrl = `${cmdUrl}blacksmith`;
const quickbuffUrl = `${cmdUrl}quickbuff`;
const composingUrl = `${cmdUrl}composing`;
const attackplayerUrl = `${cmdUrl}attackplayer${defTargetUsername}`;
const updateArchiveUrl = `${cmdUrl}${defSubcmd}viewupdatearchive`;
const archiveUrl = `${cmdUrl}${defSubcmd}viewarchive`;
const bountyUrl = `${cmdUrl}bounty`;

const guideUrl = `https://guide.fallensword.com/${cmdUrl}`;

const defAfterUpdateActionlist = 'after-update.actionlist';
const defPlayerBuffs = 'buffs.player';
const defPlayerUpdate = 'update.player';
const defPlayerLevel = 'level.stats-player';
const defPlayerGold = 'gold.stats-player';
const defShopPrompt = 'prompt.worldDialogShop';
const defControlsKeydown = 'keydown.controls';
const defRealmUpdate = 'update.realm';

const defSuffixSuccessActionResponse = '-success.action-response';
const defRefreshActionList = `-1${defSuffixSuccessActionResponse}`;
const defViewCreature = `1${defSuffixSuccessActionResponse}`;
const defPvE = `2${defSuffixSuccessActionResponse}`;
const defRelicView = `9${defSuffixSuccessActionResponse}`;
const defStairway = `5${defSuffixSuccessActionResponse}`;
const defTeleport = `25${defSuffixSuccessActionResponse}`;

const defCreatureCombat = 2;
const defRepairAll = 15;

const defFetchPlayerStats = 1;
const defFetchPlayerBackpackCount = 2;
const defFetchPlayerBackpackItems = 4;
const defFetchPlayerPrefs = 8;

const defFetchPlayerBuffs = 16;
const defFetchWorldDefines = 32;
const defFetchWorldRealmStatic = 64;
const defFetchWorldRealmDynamic = 128;

const defFetchWorldRealmActions = 256;
const defFetchPlayerEquipment = 512;
const defFetchPlayerNotifications = 1024;

const defNeedToCompose = 'needToCompose';
const defLastComposeCheck = 'lastComposeCheck';
const defCharacterVirtualLevel = 'characterVirtualLevel';
const defEnableGuildActivityTracker = 'enableGuildActivityTracker';
const defLastLadderReset = 'lastLadderReset';

const defForm = 'form';
const defTable = 'table';
const defTd = 'td';
const defTr = 'tr';

const fshBuffLog = 'fsh_buffLog';

const defStatbarLevel = 'statbar-level-tooltip-general';
const defStatLevel = 'stat-level';
const defStatDefense = 'stat-defense';
const defStatAttack = 'stat-attack';
const defStatDamage = 'stat-damage';
const defStatArmor = 'stat-armor';
const defStatHp = 'stat-hp';
const defStatVl = 'stat-vl';

const GMSTORAGE_PATH = 'GM_';

const composingFragmentType = [
  'Common', 'Rare', 'Unique', 'Legendary', 'Super Elite', 'Crystalline'];

const attribType = ['Attack', 'Defense', 'Armor', 'HP', 'Damage',
  'Stamina', 'Stamina Gain', 'Gold Gain', 'XP Gain'];

const enhancementType = ['Piercing Strike', 'Reinforced Armor',
  'Thievery', 'Critical Hit', 'Holy', 'Breaker', 'Nullify', 'Banishment',
  'Protection', 'Oceanic', 'Master Thief', 'Protect Gold', 'Dodge', 'Disarm',
  'Master Blacksmith', 'Elite Hunter', 'Sustain', 'Master Crafter',
  'Fury Caster', 'Greenskin Slayer', 'Beast Slayer', 'Duelist', 'Glory Seeker',
  'First Strike', 'Hypnotize', 'Master Inventor', 'Soulless', 'Temporal Shift',
];

const itemType = ['Helmet', 'Armor', 'Gloves', 'Boots', 'Weapon',
  'Shield', 'Ring', 'Amulet', 'Rune', 'Quest Item', 'Potion', 'Component',
  'Resource', 'Recipe', 'Container', 'Composed', 'Frag Stash'];

const oldActionSpinner = `${cdn}ui/world/action_spinner.gif`;

const chatSelector = 'img[title="Chat"], img[oldtitle="Chat"]';
const combatSelector = 'img[title="Combat"], img[oldtitle="Combat"]';
const noteSelector = 'img[title="Notification"], img[oldtitle="Notification"]';
const playerLinkSelector = 'a[href*="&player_id="]';

var lastScavPage="";var lastActiveQuestPage="";var lastNormalActiveQuestPage="";var lastNormalCompletedQuestPage="";var lastNormalNotStartedQuestPage="";var lastSeasonalActiveQuestPage="";var lastSeasonalCompletedQuestPage="";var lastSeasonalNotStartedQuestPage="";var enableLogColoring=false;var enableChatParsing=false;var enableCreatureColoring=false;var showCombatLog=false;var showCreatureInfo=false;var keepLogs=false;var showExtraLinks=false;var huntingBuffs="Doubler,Librarian,Adept Learner,Merchant,Treasure Hunter,Animal Magnetism,Conserve";var huntingBuffsName="default";var huntingBuffs2="Deflect";var huntingBuffs2Name="PvP";var huntingBuffs3="Super Elite Slayer";var huntingBuffs3Name="SE";var showHuntingBuffs=false;var moveFSBox=false;var moveDailyQuest=false;var guildSelf="";var guildSelfMessage="Member of your own guild!";var guildFrnd="";var guildFrndMessage="Do not attack - Guild is friendly!";var guildPast="";var guildPastMessage="Do not attack - You've been in that guild once!";var guildEnmy="";var guildEnmyMessage="Enemy guild. Attack at will!";var goldRecipient="";var goldAmount="";var sendGoldonWorld=false;var hideQuests=false;var hideQuestNames="";var hideRecipes=false;var hideRecipeNames="";var enableGuildInfoWidgets=false;var enableOnlineAlliesWidgets=false;var guildOnlineRefreshTime=300;var hideGuildInfoSecureTrade=false;var hideGuildInfoTrade=false;var hideGuildInfoMessage=false;var hideGuildInfoBuff=false;var buyBuffsGreeting="Hello {playername}, can I buy {buffs} for {cost} please?";var renderSelfBio=false;var bioEditLines=10;var renderOtherBios=false;var playNewMessageSound=false;var showSpeakerOnWorld=false;var defaultMessageSound="https://fallenswordhelper.github.io/fallenswordhelper/audio/sms-alert-2-daniel_simon.wav";var highlightPlayersNearMyLvl=false;var highlightGvGPlayersNearMyLvl=false;var detailedConflictInfo=false;var gameHelpLink=true;var enableAllyOnlineList=false;var enableEnemyOnlineList=false;var allyEnemyOnlineRefreshTime=300;var moveGuildList=false;var moveOnlineAlliesList=false;var hideMatchesForCompletedMoves=false;var doNotKillList="";var enableBioCompressor=false;var currentGoldSentTotal=0;var keepBuffLog=false;var buffLog="";var enableActiveBountyList=false;var bountyListRefreshTime=300;var enableWantedList=false;var wantedNames="";var wantedGuildMembers=false;var bwNeedsRefresh=true;var fsboxlog=false;var fsboxcontent="";var itemRecipient="";var quickLinks="[]";var enableAttackHelper=false;var minGroupLevel=1;var combatEvaluatorBias=0;var huntingMode=false;var enabledHuntingMode="1";var hideRelicOffline=false;var enterForSendMessage=false;var trackKillStreak=false;var storeLastQuestPage=false;var addAttackLinkToLog=false;var showStatBonusTotal=false;var newGuildLogHistoryPages=3;var useNewGuildLog=false;var enhanceChatTextEntry=false;var ajaxifyRankControls=false;var enableMaxGroupSizeToJoin=false;var maxGroupSizeToJoin=11;var enableTempleAlert=false;var enableUpgradeAlert=false;var enableComposingAlert=false;var autoFillMinBidPrice=false;var showPvPSummaryInLog=false;var enableQuickDrink=false;var enhanceOnlineDots=false;var hideBuffSelected=false;var hideHelperMenu=false;var keepHelperMenuOnScreen=true;var draggableHelperMenu=false;var quickLinksTopPx=22;var quickLinksLeftPx=0;var draggableQuickLinks=false;var showNextQuestSteps=true;var showRecallMessages=true;var showRelicMessages=true;var showMercenaryMessages=true;var showGroupCombatMessages=true;var showDonationMessages=true;var showRankingMessages=true;var showGvGMessages=true;var showTaggingMessages=true;var showTitanMessages=true;var showQuickDropLinks=false;var onlinePlayerMinLvl=1;var onlinePlayerMaxLvl=9999;var arenaMinLvl=1;var arenaMaxLvl=9999;var showMonsterLog=false;var lastTempleCheck=0;var needToPray=false;var lastChatCheck="0";var lastGuildLogCheck="0";var lastOutBoxCheck="0";var lastPlayerLogCheck="0";var showAdmin=false;var alliestotal=0;var enemiestotal=0;var footprints=false;var hideNonPlayerGuildLogMessages=false;var listOfAllies="";var listOfEnemies="";var contactList="";var lastUpgradeCheck=0;var needToDoUpgrade=false;var characterVirtualLevel=0;var guildLogoControl=false;var statisticsControl=false;var guildStructureControl=false;var lastMembrListCheck=0;var showQuickSendLinks=false;var needToCompose=false;var lastComposeCheck=0;var lastOnlineCheck=0;var bountyList="";var wantedList="";var lowestLevelInTop250=0;var quickMsg="[\"Thank you very much ^_^\",\"Happy hunting, {playername}\"]";var sendClasses="[\"Composed Pots\", \"13699\"], [\"Amber\", \"5611\"], [\"Amethyst Weed\", \"9145\"], [\"Blood Bloom\", \"5563\"], [\"Cerulean Rose\", \"9156\"], [\"Coleoptera Body\", \"9287\"], [\"Dark Shade\", \"5564\"], [\"Deathbloom\", \"9140\"], [\"Deathly Mold\", \"9153\"], [\"Greenskin Fungus\", \"9148\"], [\"Heffle\", \"5565\"], [\"Jademare\", \"5566\"], [\"Ruby Thistle\", \"9143\"], [\"Toad Corpse\",\"9288\"], [\"Trinettle\", \"5567\"], [\"Viridian Vine\", \"9151\"], [\"Mortar & Pestle\", \"9157\"], [\"Beetle Juice\", \"9158\"]";var quickSearchList="[{\"category\":\"Plants\",\"searchname\":\"Amber\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Blood Bloom\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Jademare\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Dark Shade\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Trinettle\",\"nickname\":\"\"},{\"category\":\"Plants\",\"searchname\":\"Heffle Wart\",\"nickname\":\"\"},{\"category\":\"Potions\",\"searchname\":\"Sludge Brew\",\"nickname\":\"DC 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Black Death\",\"nickname\":\"DC 225\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Aid\",\"nickname\":\"Assist\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Supreme Doubling\",\"nickname\":\"DB 450\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Acceleration\",\"nickname\":\"DB 500\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Lesser Death Dealer\",\"nickname\":\"DD\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Runic Potion\",\"nickname\":\"FI 250\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of the Bookworm\",\"nickname\":\"Lib 225\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Truth\",\"nickname\":\"EW 1k\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Dull Edge\",\"nickname\":\"DE 25\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Notched Blade\",\"nickname\":\"DE 80\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Death\",\"nickname\":\"DW 125\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Decay\",\"nickname\":\"WI 150\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Fatality\",\"nickname\":\"WI 350\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Annihilation\",\"nickname\":\"DW 150\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of the Wise\",\"nickname\":\"Lib 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Shattering\",\"nickname\":\"SA\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Dragons Blood Potion\",\"nickname\":\"ZK 200\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Berserkers Potion\",\"nickname\":\"ZK 300\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Fury\",\"nickname\":\"ZK 350\",\"displayOnAH\":true},{\"category\":\"Potions\",\"searchname\":\"Potion of Supreme Luck\",\"nickname\":\"FI 1k\",\"displayOnAH\":true}]";var arenaMoves="[]";var arenaMatches="[]";var CombatLog="";var hideChampionsGroup=false;var hideElitesGroup=false;var hideSEGroup=false;var hideTitanGroup=false;var hideLegendaryGroup=false;var disableDeactivatePrompts=false;var moveComposingButtons=false;var expandMenuOnKeyPress=false;var disableBreakdownPrompts=false;var collapseNewsArchive=false;var collapseHallPosts=false;var lastmyGuildLogCheck=0;var hideSubLvlCreature=false;var hidePlayerActions=false;var extraProfile="";var textToSearchFor="";var lastLadderReset=0;var disableQuickWearPrompts=false;var enableGuildActivityTracker=false;var enableSeTracker=false;var showTitanInfo=false;var highlightPvpProtection=false;var showBuffInfo=false;var enableHistoryCompressor=false;var enableStamBars=false;var appBad=[0,false];var ajaxifyDestroy=false;var statBarLinks=false;var staminaCalculator=false;var levelUpCalculator=false;var resizeQuickBuff=false;var joinAllLink=false;var pageTwoLinks=false;var addUfsgLinks=false;var trackLadderReset=false;var addServerNode=false;var addScoutTowerLink=false;var storeLastScavPage=false;var recipeManagerLink=false;var medalGuideLink=false;var inventoryManagerLink=false;var buffLogLink=false;var combatLogLink=false;var creatureLogLink=false;var quickLinksLink=false;var auctionSearchLink=false;var onlinePlayersLink=false;var findOtherLink=false;var findBuffsLink=false;var guildInventoryLink=false;var newGuildLogLink=false;var topRatedLink=false;var enableMessageTemplates=false;var wrapGuildChat=false;var colorPlayerNames=false;var addIgnoreLink=false;var changeButtonLabels=false;var notificationWidgets=false;var fastDebuff=false;var countAllyEnemy=false;var fixFolderImages=false;var componentWidgets=false;var quickWearLink=false;var selectAllLink=false;var nekidButton=false;var ajaxifyProfileSections=false;var injectBuffGuide=false;var statisticsWrap=false;var showGuildRelationship=false;var showQuickButtons=false;var showBuffLevel=false;var enableItemColoring=false;var checkAllOfType=false;var enableFolderFilter=false;var defaults = {lastScavPage:lastScavPage,lastActiveQuestPage:lastActiveQuestPage,lastNormalActiveQuestPage:lastNormalActiveQuestPage,lastNormalCompletedQuestPage:lastNormalCompletedQuestPage,lastNormalNotStartedQuestPage:lastNormalNotStartedQuestPage,lastSeasonalActiveQuestPage:lastSeasonalActiveQuestPage,lastSeasonalCompletedQuestPage:lastSeasonalCompletedQuestPage,lastSeasonalNotStartedQuestPage:lastSeasonalNotStartedQuestPage,enableLogColoring:enableLogColoring,enableChatParsing:enableChatParsing,enableCreatureColoring:enableCreatureColoring,showCombatLog:showCombatLog,showCreatureInfo:showCreatureInfo,keepLogs:keepLogs,showExtraLinks:showExtraLinks,huntingBuffs:huntingBuffs,huntingBuffsName:huntingBuffsName,huntingBuffs2:huntingBuffs2,huntingBuffs2Name:huntingBuffs2Name,huntingBuffs3:huntingBuffs3,huntingBuffs3Name:huntingBuffs3Name,showHuntingBuffs:showHuntingBuffs,moveFSBox:moveFSBox,moveDailyQuest:moveDailyQuest,guildSelf:guildSelf,guildSelfMessage:guildSelfMessage,guildFrnd:guildFrnd,guildFrndMessage:guildFrndMessage,guildPast:guildPast,guildPastMessage:guildPastMessage,guildEnmy:guildEnmy,guildEnmyMessage:guildEnmyMessage,goldRecipient:goldRecipient,goldAmount:goldAmount,sendGoldonWorld:sendGoldonWorld,hideQuests:hideQuests,hideQuestNames:hideQuestNames,hideRecipes:hideRecipes,hideRecipeNames:hideRecipeNames,enableGuildInfoWidgets:enableGuildInfoWidgets,enableOnlineAlliesWidgets:enableOnlineAlliesWidgets,guildOnlineRefreshTime:guildOnlineRefreshTime,hideGuildInfoSecureTrade:hideGuildInfoSecureTrade,hideGuildInfoTrade:hideGuildInfoTrade,hideGuildInfoMessage:hideGuildInfoMessage,hideGuildInfoBuff:hideGuildInfoBuff,buyBuffsGreeting:buyBuffsGreeting,renderSelfBio:renderSelfBio,bioEditLines:bioEditLines,renderOtherBios:renderOtherBios,playNewMessageSound:playNewMessageSound,showSpeakerOnWorld:showSpeakerOnWorld,defaultMessageSound:defaultMessageSound,highlightPlayersNearMyLvl:highlightPlayersNearMyLvl,highlightGvGPlayersNearMyLvl:highlightGvGPlayersNearMyLvl,detailedConflictInfo:detailedConflictInfo,gameHelpLink:gameHelpLink,enableAllyOnlineList:enableAllyOnlineList,enableEnemyOnlineList:enableEnemyOnlineList,allyEnemyOnlineRefreshTime:allyEnemyOnlineRefreshTime,moveGuildList:moveGuildList,moveOnlineAlliesList:moveOnlineAlliesList,hideMatchesForCompletedMoves:hideMatchesForCompletedMoves,doNotKillList:doNotKillList,enableBioCompressor:enableBioCompressor,currentGoldSentTotal:currentGoldSentTotal,keepBuffLog:keepBuffLog,buffLog:buffLog,enableActiveBountyList:enableActiveBountyList,bountyListRefreshTime:bountyListRefreshTime,enableWantedList:enableWantedList,wantedNames:wantedNames,wantedGuildMembers:wantedGuildMembers,bwNeedsRefresh:bwNeedsRefresh,fsboxlog:fsboxlog,fsboxcontent:fsboxcontent,itemRecipient:itemRecipient,quickLinks:quickLinks,enableAttackHelper:enableAttackHelper,minGroupLevel:minGroupLevel,combatEvaluatorBias:combatEvaluatorBias,huntingMode:huntingMode,enabledHuntingMode:enabledHuntingMode,hideRelicOffline:hideRelicOffline,enterForSendMessage:enterForSendMessage,trackKillStreak:trackKillStreak,storeLastQuestPage:storeLastQuestPage,addAttackLinkToLog:addAttackLinkToLog,showStatBonusTotal:showStatBonusTotal,newGuildLogHistoryPages:newGuildLogHistoryPages,useNewGuildLog:useNewGuildLog,enhanceChatTextEntry:enhanceChatTextEntry,ajaxifyRankControls:ajaxifyRankControls,enableMaxGroupSizeToJoin:enableMaxGroupSizeToJoin,maxGroupSizeToJoin:maxGroupSizeToJoin,enableTempleAlert:enableTempleAlert,enableUpgradeAlert:enableUpgradeAlert,enableComposingAlert:enableComposingAlert,autoFillMinBidPrice:autoFillMinBidPrice,showPvPSummaryInLog:showPvPSummaryInLog,enableQuickDrink:enableQuickDrink,enhanceOnlineDots:enhanceOnlineDots,hideBuffSelected:hideBuffSelected,hideHelperMenu:hideHelperMenu,keepHelperMenuOnScreen:keepHelperMenuOnScreen,draggableHelperMenu:draggableHelperMenu,quickLinksTopPx:quickLinksTopPx,quickLinksLeftPx:quickLinksLeftPx,draggableQuickLinks:draggableQuickLinks,showNextQuestSteps:showNextQuestSteps,showRecallMessages:showRecallMessages,showRelicMessages:showRelicMessages,showMercenaryMessages:showMercenaryMessages,showGroupCombatMessages:showGroupCombatMessages,showDonationMessages:showDonationMessages,showRankingMessages:showRankingMessages,showGvGMessages:showGvGMessages,showTaggingMessages:showTaggingMessages,showTitanMessages:showTitanMessages,showQuickDropLinks:showQuickDropLinks,onlinePlayerMinLvl:onlinePlayerMinLvl,onlinePlayerMaxLvl:onlinePlayerMaxLvl,arenaMinLvl:arenaMinLvl,arenaMaxLvl:arenaMaxLvl,showMonsterLog:showMonsterLog,lastTempleCheck:lastTempleCheck,needToPray:needToPray,lastChatCheck:lastChatCheck,lastGuildLogCheck:lastGuildLogCheck,lastOutBoxCheck:lastOutBoxCheck,lastPlayerLogCheck:lastPlayerLogCheck,showAdmin:showAdmin,alliestotal:alliestotal,enemiestotal:enemiestotal,footprints:footprints,hideNonPlayerGuildLogMessages:hideNonPlayerGuildLogMessages,listOfAllies:listOfAllies,listOfEnemies:listOfEnemies,contactList:contactList,lastUpgradeCheck:lastUpgradeCheck,needToDoUpgrade:needToDoUpgrade,characterVirtualLevel:characterVirtualLevel,guildLogoControl:guildLogoControl,statisticsControl:statisticsControl,guildStructureControl:guildStructureControl,lastMembrListCheck:lastMembrListCheck,showQuickSendLinks:showQuickSendLinks,needToCompose:needToCompose,lastComposeCheck:lastComposeCheck,lastOnlineCheck:lastOnlineCheck,bountyList:bountyList,wantedList:wantedList,lowestLevelInTop250:lowestLevelInTop250,quickMsg:quickMsg,sendClasses:sendClasses,quickSearchList:quickSearchList,arenaMoves:arenaMoves,arenaMatches:arenaMatches,CombatLog:CombatLog,hideChampionsGroup:hideChampionsGroup,hideElitesGroup:hideElitesGroup,hideSEGroup:hideSEGroup,hideTitanGroup:hideTitanGroup,hideLegendaryGroup:hideLegendaryGroup,disableDeactivatePrompts:disableDeactivatePrompts,moveComposingButtons:moveComposingButtons,expandMenuOnKeyPress:expandMenuOnKeyPress,disableBreakdownPrompts:disableBreakdownPrompts,collapseNewsArchive:collapseNewsArchive,collapseHallPosts:collapseHallPosts,lastmyGuildLogCheck:lastmyGuildLogCheck,hideSubLvlCreature:hideSubLvlCreature,hidePlayerActions:hidePlayerActions,extraProfile:extraProfile,textToSearchFor:textToSearchFor,lastLadderReset:lastLadderReset,disableQuickWearPrompts:disableQuickWearPrompts,enableGuildActivityTracker:enableGuildActivityTracker,enableSeTracker:enableSeTracker,showTitanInfo:showTitanInfo,highlightPvpProtection:highlightPvpProtection,showBuffInfo:showBuffInfo,enableHistoryCompressor:enableHistoryCompressor,enableStamBars:enableStamBars,appBad:appBad,ajaxifyDestroy:ajaxifyDestroy,statBarLinks:statBarLinks,staminaCalculator:staminaCalculator,levelUpCalculator:levelUpCalculator,resizeQuickBuff:resizeQuickBuff,joinAllLink:joinAllLink,pageTwoLinks:pageTwoLinks,addUfsgLinks:addUfsgLinks,trackLadderReset:trackLadderReset,addServerNode:addServerNode,addScoutTowerLink:addScoutTowerLink,storeLastScavPage:storeLastScavPage,recipeManagerLink:recipeManagerLink,medalGuideLink:medalGuideLink,inventoryManagerLink:inventoryManagerLink,buffLogLink:buffLogLink,combatLogLink:combatLogLink,creatureLogLink:creatureLogLink,quickLinksLink:quickLinksLink,auctionSearchLink:auctionSearchLink,onlinePlayersLink:onlinePlayersLink,findOtherLink:findOtherLink,findBuffsLink:findBuffsLink,guildInventoryLink:guildInventoryLink,newGuildLogLink:newGuildLogLink,topRatedLink:topRatedLink,enableMessageTemplates:enableMessageTemplates,wrapGuildChat:wrapGuildChat,colorPlayerNames:colorPlayerNames,addIgnoreLink:addIgnoreLink,changeButtonLabels:changeButtonLabels,notificationWidgets:notificationWidgets,fastDebuff:fastDebuff,countAllyEnemy:countAllyEnemy,fixFolderImages:fixFolderImages,componentWidgets:componentWidgets,quickWearLink:quickWearLink,selectAllLink:selectAllLink,nekidButton:nekidButton,ajaxifyProfileSections:ajaxifyProfileSections,injectBuffGuide:injectBuffGuide,statisticsWrap:statisticsWrap,showGuildRelationship:showGuildRelationship,showQuickButtons:showQuickButtons,showBuffLevel:showBuffLevel,enableItemColoring:enableItemColoring,checkAllOfType:checkAllOfType,enableFolderFilter:enableFolderFilter};

const reviver = [
  ['S]', (value) => value.substr(2)],
  ['N]', (value) => parseInt(value.substr(2), 10)],
  ['B]', (value) => value.substr(2) === 'true'],
];

function retrieve(value) {
  const test = reviver.find((el) => value.startsWith(el[0]));
  if (test) { return test[1](value); }
  return value;
}

function fshGetValue(name, defValue) {
  const value = window.localStorage.getItem(GMSTORAGE_PATH + name);
  if (value === null || isUndefined(value)) { return defValue; }
  return retrieve(value);
}

function getValue(name) {
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  No default setting available
    if (isUndefined(defaults[name])) {
      // eslint-disable-next-line no-console
      console.log('No default setting available', name, defaults[name]);
    }
  }
  return fshGetValue(name, defaults[name]);
}

function jsonParse(str, reviver) {
  try {
    return JSON.parse(str, reviver);
  } catch (e) {
    // Ignore bad json
  }
}

function reviver$1(key, value) {
  if (typeof value === 'string') {
    const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/
      .exec(value);
    if (a) {
      return new Date(Date.UTC(Number(a[1]), Number(a[2]) - 1, Number(a[3]),
        Number(a[4]), Number(a[5]), Number(a[6])));
    }
  }
  return value;
}

function getValueJSON(name) {
  const resultJSON = getValue(name);
  let result;
  if (resultJSON) { result = jsonParse(resultJSON, reviver$1); }
  return result;
}

function retBool(bool, ifTrue, ifFalse) {
  if (bool) {
    return ifTrue;
  }
  return ifFalse;
}

function retOption(option, ifTrue, ifFalse) {
  return retBool(getValue(option), ifTrue, ifFalse);
}

function isDraggable(draggableQuickLinks) {
  if (draggableQuickLinks) {
    draggable(getElementById('fshQuickLinks'));
  }
}

function invalid(link) {
  return !('newWindow' in link) || !link.url || !link.name;
}

function linkHtml(link) {
  if (invalid(link)) { return ''; }
  const newWindow = retBool(link.newWindow, ' target="new"', '');
  return `<li><a href="${escapeHtml(link.url)}"${
    newWindow}>${link.name}</a></li>`;
}

function makeQuickLinks(quickLinks) {
  return quickLinks.map(linkHtml).join('');
}

function haveLinks(quickLinks) {
  const draggableQuickLinks = getValue('draggableQuickLinks');
  const html = `<div style="top:${getValue('quickLinksTopPx')}px; left:${
    getValue('quickLinksLeftPx')}px;" id="fshQuickLinks" `
    + `class="fshQuickLinks fshInnerBg${
      retOption('keepHelperMenuOnScreen', ' fshFixed', '')
    }${retBool(draggableQuickLinks, ' fshMove', '')}">${
      makeQuickLinks(quickLinks)}</div>`;
  insertHtmlBeforeEnd(document.body, html);
  isDraggable(draggableQuickLinks);
}

function haveNode() {
  const quickLinks = getValueJSON('quickLinks') || [];
  if (quickLinks.length > 0) { haveLinks(quickLinks); }
}

function injectQuickLinks() {
  const node = getElementById('statbar-container');
  if (node) { haveNode(); }
}

function doQuickLinks() {
  if (!calf.huntingMode) {
    add(3, injectQuickLinks);
  }
}

function getCustomUrlParameter(sPageURL, sParam) {
  return (new URLSearchParams(sPageURL)).get(sParam);
}

function getUrlParameter(sParam) {
  const sPageURL = decodeURIComponent(window.location.search);
  return getCustomUrlParameter(sPageURL, sParam);
}

let enabled;

function handleMsgStack(type, stuff) {
  const msg = parseError(stuff);
  if (msg.includes('calfSystem')) {
    sendException(type + msg, true);
    return true;
  }
}

function handleError(type, stuff) {
  if (stuff) {
    return handleMsgStack(type, stuff);
  }
}

function logError(e) {
  handleError('window onerror ', e.error);
}

function unhandledrejection(e) {
  if (handleError('Uncaught (in promise) ', e.reason)) {
    e.preventDefault();
  }
}

function globalErrorHandler() {
  if (!enabled) {
    on(window, 'error', logError);
    on(window, 'unhandledrejection', unhandledrejection);
    enabled = true;
  }
}

let now;
let nowSecs;

function initNow() {
  if (!now) {
    now = Date.now();
    nowSecs = Math.floor(now / 1000);
  }
}

let pCL;
let pCC;
let pCR;

function initPcc() {
  if (!pCC) {
    pCL = getElementById('pCL');
    pCC = getElementById('pCC');
    pCR = getElementById('pCR');
  }
}

const arrayFrom = (e, mapFn) => Array.from(e, mapFn);

function getElementsByTagName(tagName, element) {
  if (element) { return element.getElementsByTagName(tagName); }
  return document.getElementsByTagName(tagName);
}

function getArrayByTagName(tagName, element) {
  return arrayFrom(getElementsByTagName(tagName, element));
}

function isString(e) { return typeof e === 'string'; }

function getTextTrim(node) {
  const text = getText(node);
  if (isString(text)) {
    return getText(node).trim();
  }
}

function includesText(text, el) {
  return getTextTrim(el).includes(text);
}

function includes(text) {
  return partial(includesText, text);
}

function doMsgSound() {
  const msg = getArrayByTagName('a', pCL).filter(includes('message'));
  if (msg.length) {
    insertHtmlBeforeEnd(document.body,
      `<audio src="${getValue('defaultMessageSound')}" autoplay=true />`);
  }
}

function isMessageSound() {
  if (getValue('playNewMessageSound')) {
    add(3, doMsgSound);
  }
}

function isObject(e) { return typeof e === 'object'; }

function loadCss(c) {
  return new Promise((resolve) => {
    const linkTag = document.createElement('link');
    linkTag.type = 'text/css';
    linkTag.rel = 'stylesheet';
    linkTag.onload = () => { resolve(); };
    linkTag.href = c;
    document.body.appendChild(linkTag);
  });
}

function containsText(text, el) {
  return getTextTrim(el) === text;
}

function contains(text) {
  return partial(containsText, text);
}

function querySelectorAll(selector, scope) {
  if (scope) { return scope.querySelectorAll(selector); }
  return document.querySelectorAll(selector);
}

function querySelectorArray(selector, scope) {
  return arrayFrom(querySelectorAll(selector, scope));
}

function setInnerHtml(html, ctx) {
  if (ctx instanceof Element) {
    ctx.innerHTML = String(html);
  }
}

function toSettings(el) {
  setInnerHtml(`<a href="${cmdUrl}settings">Game Help</a>`, el);
}

function gameHelpLink$1() {
  querySelectorArray('#pCR h3').filter(contains('Game Help'))
    .forEach(toSettings);
}

const entries = (obj) => Object.entries(obj);

function mutate(fn, obj, arr) {
  if (isObject(arr[1]) && arr[1] !== null) {
    fn(obj[arr[0]], arr[1]);
  } else {
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    obj[arr[0]] = arr[1];
  }
}

function mixin(obj, mixins) {
  entries(mixins).forEach(partial(mutate, mixin, obj));
}

function cElement(type, props) {
  const el = document.createElement(type);
  if (props) { mixin(el, props); }
  return el;
}

function createDiv(props) {
  return cElement('div', props);
}

function hasClass(className, el) {
  return el.classList.contains(className);
}

function insertElement(parent, child) {
  if (parent instanceof Node && child instanceof Node) {
    parent.appendChild(child);
  }
  return child;
}

function jQueryDialog(fn) { // jQuery
  let content = getElementById('content');
  if (content) {
    setInnerHtml('', content);
  } else {
    content = createDiv({
      id: 'content',
      style: { display: 'none' },
    });
    insertElement(document.body, content);
  }
  $(content).dialog({
    width: 640,
    modal: true,
    position: {
      my: 'top', at: 'top', offset: '0 60', collision: 'none',
    },
    resizable: false,
  });
  fn(content);
}

function jQueryPresent() { return isFunction(window.jQuery); }

function onclick(target, listener, options) {
  on(target, 'click', listener, options);
}

function runDefault(prm) {
  prm.then((m) => m.default());
}

const injectBioWidgets = () => { runDefault(import('./bioWidgets-fcfad1b6.js')); };
const injectGuild = () => { runDefault(import('./guild-1b73d8d5.js')); };
const injectProfile = () => { runDefault(import('./profile-eabf6c8d.js').then(function (n) { return n.p; })); };
const injectProfileDropItems = () => { runDefault(import('./injectProfileDropItems-68eeb317.js')); };
const injectQuestBookFull = () => { runDefault(import('./injectQuestBookFull-67984cdb.js')); };
const inventing = () => { runDefault(import('./inventing-8cfc0d67.js')); };
const news = () => { runDefault(import('./news-9380403d.js')); };
const ufsgAllowBack = () => { runDefault(import('./ufsgAllowBack-96f135f9.js')); };
const viewArchive = () => { runDefault(import('./viewArchive-2788032f.js')); };

const injectBuffLog = (i) => { import('./injectBuffLog-8766d60b.js').then((m) => m.default(i)); };
const injectFsBoxContent = (i) => { import('./injectFsBoxContent-a5538cd6.js').then((m) => m.default(i)); };
const injectMonsterLog = (i) => { import('./monstorLog-de267f40.js').then((m) => m.default(i)); };
const injectNotepadShowLogs = (i) => { import('./combatLog-b667c814.js').then((m) => m.default(i)); };
const injectOnlinePlayers = (i) => { import('./injectOnlinePlayers-066ea57f.js').then((m) => m.default(i)); };
const injectRecipeManager = (i) => { import('./recipeMgr-4c3c3a4b.js').then((m) => m.default(i)); };
const insertQuickExtract = (i) => { import('./quickExtract-833039b2.js').then((m) => m.default(i)); };
const insertQuickWear = (i) => { import('./quickWear-3c98c48c.js').then((m) => m.default(i)); };

const injectAuctionSearch = (i) => { import('./lists-62d13e23.js').then((m) => m.injectAuctionSearch(i)); };
const injectQuickLinkManager = (i) => { import('./lists-62d13e23.js').then((m) => m.injectQuickLinkManager(i)); };
const injectFindBuffs = (i) => { import('./findBuffs-be69cc24.js').then((m) => m.injectFindBuffs(i)); };
const injectFindOther = (i) => { import('./findBuffs-be69cc24.js').then((m) => m.injectFindOther(i)); };

const helperMenuBlob = '<div class="column"><h3>Character</h3><ul>'
  + '<li><span class="fshLink">Buff Log</span></li>'
  + '<li><span class="fshLink">Combat Log</span></li>'
  + '<li><span class="fshLink">Creature Log</span></li>'
  + '<li><span class="fshLink">Recipe Manager</span></li>'
  + '<li><span class="fshLink">Quick Links</span></li>'
  + `<li><a href="${notepadBlankUrl}invmanagernew">Inventory Manager</a></li>`
  + '</ul><h3>Actions</h3><ul>'
  + '<li><span class="fshLink">Find Buffs</span></li>'
  + '<li><span class="fshLink">Find Other</span></li>'
  + '<li><span class="fshLink">Online Players</span></li>'
  + '<li><span class="fshLink">AH Quick Search</span></li>'
  + '</ul><h3>Guild</h3><ul>'
  + `<li><a href="${notepadBlankUrl}guildinvmgr">Guild Inventory</a></li>`
  + `<li><a href="${newGuildLogUrl}">New Guild Log</a></li>`
  + '</ul><h3>Extra</h3><ul>'
  + '<li><span class="fshLink">Quick Extract</span></li>'
  + '<li><span class="fshLink">Quick Wear</span></li>'
  + '<li><span class="fshLink">FS Box Log</span></li>'
  + '</ul><h3>FSH developer quick links</h3><ul>'
  + '<li><span class="a-reply" target_player="PointyHair">PM</span> '
  + `<a href="${playerIdUrl}1963510">PointyHair</a></li>`
  + '</ul></div>';

function toggleMenu(evt) {
  if (evt.target.id !== 'helperMenu') { return; }
  const menu = evt.target.children[0];
  menu.classList.toggle('showMenuDiv');
}

const functionLookup = {
  'Buff Log': injectBuffLog,
  'Combat Log': injectNotepadShowLogs,
  'Creature Log': injectMonsterLog,
  'Recipe Manager': injectRecipeManager,
  'Quick Links': injectQuickLinkManager,
  'Find Buffs': injectFindBuffs,
  'Find Other': injectFindOther,
  'Online Players': injectOnlinePlayers,
  'AH Quick Search': injectAuctionSearch,
  'Quick Extract': insertQuickExtract,
  'Quick Wear': insertQuickWear,
  'FS Box Log': injectFsBoxContent,
};

function callHelperFunction(evt) {
  const functionPath = getText(evt.target);
  const fn = functionLookup[functionPath];
  if (jQueryPresent() && isFunction(fn)) {
    sendEvent('helperMenu', functionPath);
    jQueryDialog(fn);
  }
}

function eventHandler(evt) {
  if (hasClass('fshLink', evt.target)) {
    callHelperFunction(evt);
    return;
  }
  if (hasClass('a-reply', evt.target)) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
  }
}

function showHelperMenu(evt) {
  const helperMenu = evt.target;
  const helperMenuDiv = createDiv({
    id: 'helperMenuDiv',
    className: 'helperMenuDiv fshInnerBg',
  });
  insertHtmlBeforeEnd(helperMenuDiv, helperMenuBlob);
  insertElement(helperMenu, helperMenuDiv);
  onclick(helperMenu, toggleMenu);
  onclick(helperMenuDiv, eventHandler);
}

function haveNode$1() {
  const helperMenu = createDiv({
    id: 'helperMenu',
    className: 'helperMenu',
    innerHTML: 'Helper&nbsp;Menu',
  });
  if (getValue('keepHelperMenuOnScreen')) {
    helperMenu.classList.add('fshFixed');
  }
  once(helperMenu, 'mouseenter', showHelperMenu);
  if (getValue('draggableHelperMenu')) {
    helperMenu.classList.add('fshMove');
    draggable(helperMenu);
  }
  insertElement(document.body, helperMenu);
}

function injectHelperMenu() {
  // don't put all the menu code here (but call if clicked) to minimize lag
  const node = getElementById('statbar-container');
  if (node) { haveNode$1(); }
}

function execute(fn) {
  fn();
}

function executeAll(ary) {
  ary.forEach(execute);
}

function getCalfPrefs(pref) { calf[pref] = getValue(pref); }

function asyncPThree(fnList) {
  fnList.forEach((fn) => add(3, fn));
}

function fromEntries(entries) {
  return Object.fromEntries(entries);
}

function jQueryNotPresent() { return !jQueryPresent(); }

function querySelector(selector, scope) {
  if (scope) { return scope.querySelector(selector); }
  return document.querySelector(selector);
}

function sectionClosed(id) {
  return id !== -1
    && querySelector(`#nav li.nav-level-0:nth-child(${id + 1}) ul`)
      .offsetHeight === 0;
}

function validateId(id) {
  if (sectionClosed(id)) {
    sendEvent('accordion', 'collapse');
    return -1;
  }
  return id;
}

function navMenu(myNav) {
  const oldSave = myNav._saveState;
  // eslint-disable-next-line no-param-reassign
  myNav._saveState = function _saveState(id) {
    oldSave.call(myNav, validateId(id));
  };
}

function foundNav(myNav) {
  if (isObject(myNav)) { return true; }
  sendException('$(\'#nav\').data(\'hcsNav\') is not an object', false);
}

function foundHeights(myNav) {
  if ('heights' in myNav) { return true; }
  sendException('$(\'#nav\').data(\'hcsNav\').heights does not exist', false);
}

function foundWidget(myNav) {
  if (foundNav(myNav) && foundHeights(myNav)) { return true; }
}

function preFlight() { // jQuery.min
  const theNav = getElementById('nav');
  const myNav = $(theNav).data('hcsNav');
  if (myNav && foundWidget(myNav)) {
    return [theNav, myNav];
  }
  return [];
}

var theLinks = ["recipeManagerLink","medalGuideLink","inventoryManagerLink","buffLogLink","combatLogLink","creatureLogLink","quickLinksLink","auctionSearchLink","onlinePlayersLink","findOtherLink","findBuffsLink","guildInventoryLink","newGuildLogLink","topRatedLink"];

function updateQuestLink() {
  const lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (getValue('storeLastQuestPage') && lastActiveQuestPage.length > 0) {
    getElementById('nav-character-questbook').href = lastActiveQuestPage;
  }
}

function updateScavLink() {
  const lastScavPage = getValue('lastScavPage');
  if (getValue('storeLastScavPage') && lastScavPage.length > 0) {
    getElementById('nav-actions-artisanship-scavenging').href = lastScavPage;
  }
}

function updateLinks() {
  updateQuestLink();
  updateScavLink();
}

function getLinkConfig(theNav, myNav) {
  const linkConfig = theLinks.map((c) => [c, getValue(c)]);
  if (linkConfig.some(([, b]) => b)) {
    import('./injectItems-02dc4f61.js')
      .then((m) => m.default(theNav, myNav, fromEntries(linkConfig)));
  }
}

function doAccordion() {
  const [theNav, myNav] = preFlight();
  if (theNav && myNav) {
    updateLinks();
    getLinkConfig(theNav, myNav);
    navMenu(myNav);
  }
}

function injectMenu() {
  if (!pCL || jQueryNotPresent()) { return; }
  doAccordion();
}

const css$6 = ".fshButton {\r\n  background: #fece2f url(https://www.fallensword.com/media/dist/img/jQueryUITheme/ui-bg_gloss-wave_60_fece2f_500x100.png) 50% 50% repeat-x;\r\n  border: 1px solid #d19405;\r\n  color: #4c3000;\r\n  font-weight: bold;\r\n}\r\n.fshButton:hover {\r\n  background: #f0be00 url(https://www.fallensword.com/media/dist/img/jQueryUITheme/ui-bg_gloss-wave_70_f0be00_500x100.png) 50% 50% repeat-x;\r\n  border: 1px solid #a45b13;\r\n  color: #381f00;\r\n  font-weight: bold;\r\n}\r\n.fshBlck {display: block;}\r\n.fshTmpl {\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n}\r\n";
const modules_514e5e3f = {};

function getElementsByClassName(names, element) {
  if (element) { return element.getElementsByClassName(names); }
  return document.getElementsByClassName(names);
}

let quickMsgDialog;

function getQuickMessageDialog() {
  if (!quickMsgDialog) {
    quickMsgDialog = getElementById('quickMessageDialog');
  }
  return quickMsgDialog;
}

function setText(text, ctx) {
  if (ctx instanceof Node) {
    ctx.textContent = String(text);
  }
}

let validateTips;

function getValidateTips() {
  if (!validateTips) {
    const nodes = getElementsByClassName('validateTips',
      getQuickMessageDialog());
    if (nodes.length === 1) {
      [validateTips] = nodes;
    }
  }
  return validateTips;
}

function doValidateTip(text) {
  if (getValidateTips()) {
    setText(fallback(text, ''), validateTips);
  }
}

let dialogMsg;

function getMsg() {
  if (!dialogMsg) {
    dialogMsg = getElementById('quickMsgDialog_msg');
  }
  return dialogMsg;
}

let enterForSendMessage$1;
let handlerEnabled;
let sendMessage;

function getSendMessage() { // jQuery
  if (!sendMessage) {
    const buttons = $(getQuickMessageDialog()).dialog('option', 'buttons');
    sendMessage = buttons['Send Message'];
  }
  return sendMessage;
}

function getEnterForSendMessage() {
  if (isUndefined(enterForSendMessage$1)) {
    enterForSendMessage$1 = getValue('enterForSendMessage');
  }
  return enterForSendMessage$1;
}

function keypress(evt) {
  if (evt.key === 'Enter' && !evt.shiftKey) {
    evt.preventDefault();
    getSendMessage()();
  }
}

function sendOnEnter() {
  if (getEnterForSendMessage() && !handlerEnabled) {
    on(getMsg(), 'keypress', keypress);
    handlerEnabled = true;
  }
}

let targetPlayer;

function getName() {
  return targetPlayer;
}

function setName(name) {
  targetPlayer = name;
  setText(name, getElementById('quickMsgDialog_targetUsername'));
}

function classPair(target, el) { return hasClass(el[0], target); }

function handleEvent(passingTest, evtAry, evt) {
  const { target } = evt;
  const hdl = evtAry.find(partial(passingTest, target));
  if (hdl) { return hdl[1](target); }
}

function classHandler(evtAry) {
  return partial(handleEvent, classPair, evtAry);
}

function isNumber(e) { return typeof e === 'number'; }

function storItem(name, type, value) {
  if (!isUndefined(Modernizr) && Modernizr.localstorage) {
    window.localStorage.setItem(GMSTORAGE_PATH + name, type + value);
  }
}

const cold = [
  [isString, (name, value) => { storItem(name, 'S]', value); }],
  [
    isNumber,
    (name, value) => {
      if (value.toString().indexOf('.') < 0) { storItem(name, 'N]', value); }
    },
  ],
  [isBoolean, (name, value) => { storItem(name, 'B]', value); }],
];

function setValue(name, value) {
  const storType = cold.find((pair) => pair[0](value));
  if (storType) {
    storType[1](name, value);
  }
}

function setValueJSON(name, value) {
  setValue(name, JSON.stringify(value));
}

let fshTemplate;
let msgTbl;
let showingTemplates;

function getFshTemplate() {
  if (!fshTemplate) {
    fshTemplate = getValueJSON('quickMsg');
  }
  return fshTemplate;
}

function getTable() {
  if (!msgTbl) {
    msgTbl = getQuickMessageDialog().lastElementChild;
  }
  return msgTbl;
}

function addRow(index, myBtn, html) {
  const newRow = msgTbl.insertRow(index);
  let newCell = newRow.insertCell(-1);
  insertHtmlBeforeEnd(newCell, myBtn);
  newCell = newRow.insertCell(-1);
  insertHtmlBeforeEnd(newCell, html);
}

function fshButton(classPrefix, label) {
  return `<button class="fshButton ui-corner-all ${classPrefix
  }-button">${label}</button>`;
}

function addTemplateRow(index, text) {
  addRow(index, fshButton('del', 'Del'),
    `<span class="ui-widget-content fshBlck add-template">${
      text}</span>`);
}

function insertTemplate(target) {
  getMsg().value += `${getText(target)
    .replace(/\{playername\}/g, getName())}`;
}

function deleteTemplate(target) {
  const myRow = target.parentNode.parentNode.rowIndex;
  msgTbl.deleteRow(myRow);
  fshTemplate.splice(myRow - 2, 1);
  setValueJSON('quickMsg', fshTemplate);
}

function addNewTemplate(target) {
  const templateInput = target.parentNode.nextElementSibling.children[0];
  const templateValue = templateInput.value;
  if (templateValue !== '') {
    const myRow = target.parentNode.parentNode.rowIndex;
    addTemplateRow(myRow, templateValue);
    templateInput.value = '';
    fshTemplate.push(templateValue);
    setValueJSON('quickMsg', fshTemplate);
  }
}

const classEvents = [
  ['del-button', deleteTemplate],
  ['add-button', addNewTemplate],
  ['add-template', insertTemplate],
];

function makeRows(text) { addTemplateRow(-1, text); }

function showMsgTemplate() {
  if (getValue('enableMessageTemplates') && !showingTemplates) {
    onclick(getTable(), classHandler(classEvents));
    getFshTemplate().forEach(makeRows);
    addRow(-1,
      fshButton('add', 'Add'),
      '<input id="newTmpl" class="ui-widget-content fshTmpl">');
    showingTemplates = true;
  }
}

function setMsg(msg) {
  const dialogMsg = getMsg();
  dialogMsg.value = fallback(msg, '');
  dialogMsg.disabled = false;
}

function openQuickMsgDialog(name, msg, tip) { // jQuery
  const quickMsgDialog = getQuickMessageDialog();
  if (hasClass('ui-dialog-content', quickMsgDialog)) {
    setName(name);
    setMsg(msg);
    doValidateTip(tip);
    showMsgTemplate();
    sendOnEnter();
    $(quickMsgDialog).dialog('open');
  }
}

function injectQuickMsgDialogJQ() {
  if (jQueryNotPresent()) { return; }
  window.openQuickMsgDialog = openQuickMsgDialog;
}

function moveUp(title) {
  import('./moveRHSBoxUpOnRHS-943a6bc4.js').then((m) => m.default(title));
}

function moveLeft(title) {
  import('./moveRHSBoxToLHS-787344a7.js').then((m) => m.default(title));
}

function doMoveGuildList() {
  if (getValue('moveGuildList')) {
    moveUp('minibox-guild');
  }
}

function doMoveAllyList() {
  if (getValue('moveOnlineAlliesList')) {
    moveUp('minibox-allies');
  }
}

function doMoveFsBox() {
  if (getValue('moveFSBox')) {
    moveLeft('minibox-fsbox');
  }
}

function doMoveDailyQuest() {
  if (getValue('moveDailyQuest')) {
    moveLeft('minibox-daily-quest');
  }
}

// function doMoveXmas() {
//   if (getValue('moveXmasBox')) {
//     moveLeft('minibox-xmas');
//   }
// }

function callAllyEnemy() {
  if (calf.enableAllyOnlineList
      || calf.enableEnemyOnlineList) {
    runDefault(import('./allyEnemy-943fb88e.js'));
  }
}

function callBounties() {
  if (calf.enableWantedList
      || calf.enableActiveBountyList) {
    runDefault(import('./activeWantedBounties-3d82978f.js'));
  }
}

function callGuildInfo() {
  if (calf.enableGuildInfoWidgets) {
    runDefault(import('./addGuildInfoWidgets-04d1aa4d.js'));
  }
}

function callAllies() {
  if (calf.enableOnlineAlliesWidgets) {
    runDefault(import('./addOnlineAlliesWidgets-0d25aa6b.js'));
  }
}

function callTemple() {
  if (calf.enableTempleAlert) {
    runDefault(import('./injectTempleAlert-8f3b68c0.js'));
  }
}

function callUpgrade() {
  if (calf.enableUpgradeAlert) {
    runDefault(import('./injectUpgradeAlert-1a59365e.js'));
  }
}

function callComposing() {
  if (calf.enableComposingAlert) {
    runDefault(import('./injectComposeAlert-810b02e6.js'));
  }
}

function statbar() {
  if (getValue('statBarLinks')) {
    runDefault(import('./statBar-476930e3.js'));
  }
}

function staminaCalc() {
  if (getValue('staminaCalculator')) {
    runDefault(import('./injectStaminaCalculator-a5a6fa56.js'));
  }
}

function levelCalc() {
  if (getValue('levelUpCalculator')) {
    runDefault(import('./injectLevelupCalculator-a2495399.js'));
  }
}

function fsBoxLog() {
  if (getValue('fsboxlog')) {
    runDefault(import('./injectFSBoxLog-eb4696b9.js'));
  }
}

function expandQb() {
  if (getValue('resizeQuickBuff')) {
    runDefault(import('./interceptQuickBuff-748265dd.js'));
  }
}

function joinAll() {
  if (getValue('joinAllLink')) {
    runDefault(import('./injectJoinAllLink-53dd5d16.js'));
  }
}

function guildLogHref() {
  if (getValue('useNewGuildLog')) {
    runDefault(import('./changeGuildLogHREF-160ad185.js'));
  }
}

function gameStats() {
  if (getValue('addServerNode')) {
    runDefault(import('./injectServerNode-233d9283.js'));
  }
}

function scoutTower() {
  if (getValue('addScoutTowerLink')) {
    runDefault(import('./scoutTowerLink-c9851d62.js'));
  }
}

function guildActivityTracker() {
  if (jQueryPresent() && getValue(defEnableGuildActivityTracker)) {
    runDefault(import('./guildActivity-cc0fb877.js'));
  }
}

function seTracker() {
  if (jQueryPresent() && calf.enableSeTracker && calf.cmd !== 'superelite') {
    import('./seLog-56330afe.js').then((m) => m.seLog());
  }
}

// move boxes in opposite order that you want them to appear.
const p3functions = [
  doMoveGuildList,
  doMoveAllyList,
  doMoveDailyQuest,
  doMoveFsBox,
  callAllyEnemy,
  callBounties,
  callGuildInfo,
  callAllies,
  callTemple,
  callUpgrade,
  callComposing,
  injectMenu,
  injectQuickMsgDialogJQ,
  statbar,
  staminaCalc,
  levelCalc,
  fsBoxLog,
  expandQb,
  joinAll,
  guildLogHref,
  gameStats,
  scoutTower,
  guildActivityTracker,
  seTracker,
];

function priorityThree() {
  // eslint-disable-next-line no-unused-labels, no-labels
  // devLbl: { //  doMoveXmas
  //   doMoveXmas();
  // }
  asyncPThree(p3functions);
}

function getEnvVars() {
  [
    'enableAllyOnlineList',
    'enableEnemyOnlineList',
    'enableGuildInfoWidgets',
    'enableOnlineAlliesWidgets',
    'enableSeTracker',
    'hideGuildInfoTrade',
    'hideGuildInfoSecureTrade',
    'hideGuildInfoBuff',
    'hideGuildInfoMessage',
    'hideBuffSelected',
    'enableTempleAlert',
    'enableUpgradeAlert',
    'enableComposingAlert',
    'enableActiveBountyList',
    'enableWantedList',
    'wantedGuildMembers',
  ].forEach(getCalfPrefs);
  calf.allyEnemyOnlineRefreshTime = getValue('allyEnemyOnlineRefreshTime')
    * 1000;
}

const notHuntModeFunctions = [
  getEnvVars,
  priorityThree,
];

function notHuntMode() {
  if (calf.huntingMode) { return; }
  executeAll(notHuntModeFunctions);
}

function expandMenu(section) {
  if (getValue('expandMenuOnKeyPress')) {
    localStorage.setItem('hcs.nav.openIndex', section);
  }
}

function keyHandlerEvent(func) {
  sendEvent('keyHandler', func);
}

function backpack() {
  keyHandlerEvent('backpack');
  expandMenu('2');
  window.location.href = dropItemsUrl;
}

function keys(obj) {
  return Object.keys(obj);
}

function overwriteKey(obj, mixins, fn, key) {
  if (isObject(mixins[key]) && mixins[key] !== null) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = fn(mixins[key].constructor(), mixins[key]);
  } else {
    // eslint-disable-next-line no-param-reassign
    obj[key] = mixins[key];
  }
}

function extend(obj, mixins) {
  if (isObject(mixins)) {
    keys(mixins).forEach(partial(overwriteKey, obj, mixins, extend));
  }
  return obj;
}

function url(opt) {
  if (opt.data) {
    // eslint-disable-next-line no-param-reassign
    delete opt.data.fshrnd;
    return $.param(opt.data);
  }
  return opt.url;
}

function buildErrorMsg(opt, jqXhr, textStatus, errorThrown) {
  const xhrStatus = `${jqXhr.status} ${jqXhr.statusText} - `;
  if (jqXhr.statusText === errorThrown.toString()) {
    return xhrStatus + url(opt);
  }
  const jqStatus = `${xhrStatus + textStatus} ${errorThrown} - ${url(opt)}`;
  if (textStatus === 'parsererror') {
    return `${jqStatus} - ${jqXhr.responseText}`;
  }
  return jqStatus;
}

class AjaxError extends Error {
  constructor([opt, jqXhr, textStatus, errorThrown], ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(buildErrorMsg(opt, jqXhr, textStatus, errorThrown), ...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AjaxError);
    }

    // Custom debugging information
    this.jqSettings = opt;
    this.jqXhr = jqXhr;
    this.jqTextStatus = textStatus;
    this.jqErrorThrown = errorThrown;
  }
}

let paused$1 = true;
let queue = [];
let globalHandler;

function setOpts(options) {
  if (typeof options === 'string') {
    return { url: options };
  }
  return options;
}

function clearXhr(xhr) {
  xhr.abort();
  queue = [];
}

function beforeSend(xhr) {
  on(window, 'beforeunload', partial(clearXhr, xhr));
}

const ignoreStatus = [0, 503, 504];
const ignoreTextStatus = ['abort'];
const ignoreResponse = [
  'We have encountered an issue with a server connection',
  'We\'re performing maintenance on the game',
  'the team have been notified and will get it fixed soon',
  'uUDRezBqFM4',
];

function ignore(ajaxErr) {
  return ignoreStatus.includes(ajaxErr.jqXhr.status)
    || ignoreTextStatus.includes(ajaxErr.jqTextStatus)
    || ignoreResponse.some(
      (substring) => ajaxErr.jqXhr.responseText.includes(substring),
    );
}

function handleFailure(reject, ajaxErr) {
  if (!ignore(ajaxErr)) {
    sendException(ajaxErr.toString(), false);
    reject(ajaxErr);
  }
}

function failFilter([fn, opt, retries, resolve, reject]) {
  return function ajaxFail(jqXhr, textStatus, errorThrown) { // Closure
    if (retries > 0 && jqXhr.status === 503) {
      setTimeout(fn, 100, opt, retries - 1, resolve, reject);
    } else {
      handleFailure(reject,
        new AjaxError([opt, jqXhr, textStatus, errorThrown]));
    }
  };
}

function doAjax(options, retries, resolve, reject) {
  const opt = setOpts(options);
  opt.beforeSend = beforeSend;
  return $.ajax(opt).then(resolve)
    .catch(failFilter([doAjax, opt, retries, resolve, reject]));
}

function attemptTask(runner) {
  if ($.active < 5) {
    const opts = queue.shift();
    doAjax(...opts);
    runner();
  }
}

function taskRunner$1() {
  if (queue.length === 0) {
    paused$1 = true;
  } else {
    paused$1 = false;
    attemptTask(taskRunner$1);
  }
}

function initGlobalHandler() {
  if (!globalHandler) {
    $(document).ajaxComplete(taskRunner$1);
    globalHandler = true;
  }
}

function add$1(options, retries, resolve, reject) {
  queue.push([options, retries, resolve, reject]);
  if (paused$1) { taskRunner$1(); }
}

function retryAjax(options) {
  initGlobalHandler();
  if (options) {
    return new Promise(((resolve, reject) => {
      add$1(options, 10, resolve, reject);
    }));
  }
}

function callApp(data) {
  return retryAjax({
    url: 'app.php',
    data: extend(data, { browser: 1 }),
    dataType: 'json',
  });
}

function profile(data) {
  return callApp(extend({ cmd: 'profile' }, data));
}

function view() {
  return profile({ subcmd: 'view' });
}

// import { $dataAccess } from './_dataAccess';
// import viewProfile from './fallbacks/viewProfile';

function daViewProfile() {
  // return $dataAccess(appViewProfile, viewProfile);
  return view();
}

const jsonTests = [
  (itemIndex, json) => json,
  (itemIndex, json) => json.s,
  (itemIndex, json) => json.r,
  (itemIndex, json) => json.r.equip_sets,
  (itemIndex, json) => json.r.equip_sets.length > itemIndex,
];

function funcPasses(itemIndex, json, fn) { return fn(itemIndex, json); }

function goodData(itemIndex, json) {
  return jsonTests.every(partial(funcPasses, itemIndex, json));
}

function changeCombatSet(itemIndex, json) {
  if (goodData(itemIndex, json)) {
    const cbsIndex = json.r.equip_sets[itemIndex].id;
    expandMenu('2');
    window.location.href = `${profileUrl + defSubcmd
    }managecombatset&submit=Use&combatSetId=${cbsIndex}`;
  }
}

function combatSetKey(itemIndex) {
  keyHandlerEvent('changeCombatSet');
  daViewProfile().then(partial(changeCombatSet, itemIndex));
}

function createGroup() {
  keyHandlerEvent('createGroup');
  expandMenu('4');
  window.location.href = `${groupsSubcmdUrl}create`;
}

function notWorld(type, href) {
  if (!getElementById('worldPage')) {
    keyHandlerEvent(type);
    window.location.href = href;
  }
}

function doRepair() {
  // do not use repair link for new map
  notWorld('doRepair', `${blacksmithUrl + defSubcmd}repairall`);
}

function indexAjax(options) {
  mixin(options, { url: indexPhp, data: { no_mobile: 1 } });
  return retryAjax(options);
}

function indexAjaxData(data) {
  return indexAjax({ data });
}

function createDocument(details) {
  // Use DOMParser to prevent img src tags downloading
  const parser = new DOMParser();
  const doc = parser.parseFromString(details, 'text/html');
  return doc;
}

function infoBox(scope) {
  const infoMsg = getElementById('info-msg', scope);
  if (infoMsg) {
    const infoMatch = infoMsg.innerHTML;
    if (infoMatch) {
      return infoMatch.replace(/<br.*/, '');
    }
    return '';
  }
}

function infoBoxFrom(documentText) {
  const doc = createDocument(documentText);
  return infoBox(doc);
}

let sendGoldonWorld$1;

function initSendGoldOnWorld() {
  sendGoldonWorld$1 = getValue('sendGoldonWorld');
}

function doneSendGold(data) {
  const info = infoBoxFrom(data);
  if (info === 'You successfully sent gold!' || info === '') {
    setValue('currentGoldSentTotal',
      parseInt(getValue('currentGoldSentTotal'), 10)
      + parseInt(getValue('goldAmount'), 10));
    GameData.fetch(defFetchPlayerStats);
  }
}

function doSendGold() { // jQuery
  if (!sendGoldonWorld$1) { return; }
  indexAjaxData({
    cmd: 'trade',
    subcmd: 'sendgold',
    xc: window.ajaxXC,
    target_username: $('#HelperSendTo').html(),
    gold_amount: $('#HelperSendAmt').html().replace(/[^\d]/g, ''),
  }).then(doneSendGold);
}

function fastWearMgr() {
  if (!('dialogIsClosed' in calf) || calf.dialogIsClosed()) {
    keyHandlerEvent('insertQuickWear');
    jQueryDialog(insertQuickWear);
  }
}

function gotoGuild() {
  keyHandlerEvent('gotoGuild');
  expandMenu('4');
  window.location.href = `${guildSubcmdUrl}manage`;
}

function joinAllGroup() {
  keyHandlerEvent('joinAllGroup');
  expandMenu('4');
  if (!getValue('enableMaxGroupSizeToJoin')) {
    window.location.href = joinallUrl;
  } else {
    window.location.href = joinUnderUrl;
  }
}

function logPage() {
  keyHandlerEvent('logPage');
  expandMenu('2');
  window.location.href = logUrl;
}

function clickThis(el) {
  el.click();
}

function movePage(dir) {
  const dirButton = querySelector(`#pCC input[value="${dir}"]`);
  if (!dirButton) { return; }
  keyHandlerEvent('movePage');
  clickThis(dirButton);
}

function profile$1() {
  keyHandlerEvent('profile');
  expandMenu('2');
  window.location.href = profileUrl;
}

function toWorld() {
  // do not use for new map
  notWorld('toWorld', worldUrl);
}

const keyLookup = [
  ['!', combatSetKey, 0], // Shift+1
  ['@', combatSetKey, 1], // Shift+2
  ['"', combatSetKey, 1], // Shift+2 -- for UK keyboards
  ['#', combatSetKey, 2], // Shift+3
  ['£', combatSetKey, 2], // Shift+3 -- for UK keyboards
  ['$', combatSetKey, 3], // Shift+4
  ['%', combatSetKey, 4], // Shift+5
  ['^', combatSetKey, 5], // Shift+6
  ['&', combatSetKey, 6], // Shift+7
  ['*', combatSetKey, 7], // Shift+8
  ['(', combatSetKey, 8], // Shift+9
  ['0', toWorld], // go to world [0]
  ['<', movePage, '<'], // move to prev page [<]
  ['>', movePage, '>'], // move to next page [>]
  ['G', createGroup], // create group [G]
  ['L', logPage], // Log Page [L]
  ['b', backpack], // backpack [b]
  ['g', gotoGuild], // go to guild [g]
  ['j', joinAllGroup], // join all group [j]
  ['l', logPage], // Log Page [l]
  ['p', profile$1], // profile [p]
  ['r', doRepair], // repair [r]
  ['v', fastWearMgr], // fast wear manager [v]
  ['y', doSendGold], // fast send gold [y]
];

function handleKey(key) {
  const mapping = keyLookup.find(([mapped]) => key === mapped);
  if (mapping) { mapping[1](mapping[2]); }
}

const bailOut = [
  (evt) => ['HTML', 'BODY'].every((tag) => evt.target.tagName !== tag),
  /* ignore control, alt and meta keys
  (I think meta is the command key in Macintoshes) */
  (evt) => evt.ctrlKey,
  (evt) => evt.metaKey,
  (evt) => evt.altKey,
];

function doNotHandle(evt) {
  return bailOut.some((fn) => fn(evt));
}

function handleKeyUp(e) {
  if (doNotHandle(e)) { return; }
  handleKey(e.key);
}

function replaceKeyHandler() {
  on(document, 'keyup', handleKeyUp);
}

function prepareEnv() {
  if (getValue('gameHelpLink')) {
    add(3, gameHelpLink$1);
  }
  calf.huntingMode = getValue('huntingMode');
  add(3, replaceKeyHandler);
  notHuntMode();
  if (!getValue('hideHelperMenu')) {
    add(3, injectHelperMenu);
  }
}

function findHcsData() {
  const hcsHtml = getElementById('html');
  if (hcsHtml && hcsHtml.dataset) {
    return hcsHtml.dataset.hcs;
  }
}

function lookForUi(hcsData) {
  const thisJson = jsonParse(hcsData);
  if (thisJson && thisJson['new-ui']) {
    prepareEnv();
  }
}

function lookForHcsData() {
  const hcsData = findHcsData();
  if (hcsData) {
    lookForUi(hcsData);
  }
}

const injectArena = () => { runDefault(import('./arena-dc9ee5a6.js').then(function (n) { return n.a; })); };
const arenaDoJoin = () => { runDefault(import('./arenaDoJoin-a5cc82c0.js')); };
const arenaJoin = () => {
  runDefault(import('./arenaJoin-874957ec.js'));
};
const completedArenas = () => {
  runDefault(import('./completedArenas-91890151.js'));
};
const setupMoves = () => {
  runDefault(import('./setup-c27fa7f7.js'));
};
const storeMoves = () => { runDefault(import('./store-86104681.js')); };
const results = () => { runDefault(import('./results-c182011c.js')); };

const arena = {
  '-': { '-': injectArena },
  dojoin: { '-': arenaDoJoin },
  join: { '-': arenaJoin },
  completed: { '-': completedArenas },
  pickmove: { '-': storeMoves },
  setup: { '-': setupMoves },
};

// eslint-disable-next-line no-unused-labels, no-labels
devLbl: { //  arena results
  arena.results = { '-': results };
}

const injectAuctionHouse = () => {
  runDefault(import('./injectAuctionHouse-15a6dbb7.js'));
};
const quickCreate = () => {
  runDefault(import('./quickCreate-2f148942.js'));
};

var auctionhouse = {
  '-': { '-': injectAuctionHouse },
  quickcreate: { '-': quickCreate },
};

const composingBreakdown = () => { runDefault(import('./breakdown-6c17e26b.js')); };
const composingCreate = () => { runDefault(import('./composingCreate-ced0e00b.js')); };
const injectComposing = () => { runDefault(import('./composing-d7aca4b7.js')); };

var composing = {
  '-': { '-': injectComposing },
  breakdown: { '-': composingBreakdown },
  create: { '-': composingCreate },
};

const injectAdvisor = () => {
  runDefault(import('./guildAdvisor-eab5354a.js'));
};

var advisor = {
  '-': injectAdvisor,
  weekly: injectAdvisor,
};

const injectGroups = () => {
  runDefault(import('./groups-b3a171ad.js'));
};
const injectGroupStats = () => {
  runDefault(import('./injectGroupStats-00ef60d0.js'));
};

var groups = {
  viewstats: injectGroupStats,
  joinallgroupsundersize: injectGroups,
  joinall: injectGroups,
  '-': injectGroups,
};

const guildHall = () => { runDefault(import('./hall-167e84de.js')); };

var hall = {
  '-': guildHall,
  post: injectBioWidgets,
};

const injectReportPaint = () => {
  runDefault(import('./guildReport-be088782.js'));
};
const injectGuildAddTagsWidgets = () => {
  runDefault(import('./injectGuildAddTagsWidgets-9ab0942e.js'));
};
const storeitems = () => {
  runDefault(import('./storeitems-5aaea05a.js'));
};

var inventory = {
  report: injectReportPaint,
  addtags: injectGuildAddTagsWidgets,
  removetags: injectGuildAddTagsWidgets,
  storeitems,
};

const guildChat = () => { runDefault(import('./guildChat-020c0c9d.js')); };
const guildLog = () => { runDefault(import('./guildLog-7a956f10.js')); };
const guildMailbox = () => {
  runDefault(import('./guildMailbox-f075e195.js'));
};
const injectGuildBank = () => {
  runDefault(import('./injectGuildBank-bd0da9d9.js'));
};
const injectGuildRanks = () => {
  runDefault(import('./rank-27bd36e4.js'));
};
const injectRPUpgrades = () => {
  runDefault(import('./injectRPUpgrades-ad0a56f1.js'));
};
const injectScouttower = () => {
  runDefault(import('./injectScouttower-1a7b34f0.js'));
};

var guild = {
  inventory,
  chat: { '-': guildChat },
  dochat: { '-': guildChat },
  log: { '-': guildLog },
  groups,
  manage: { '-': injectGuild },
  advisor,
  history: { '-': injectBioWidgets },
  view: { '-': injectGuild },
  scouttower: { '-': injectScouttower },
  mailbox: { '-': guildMailbox },
  ranks: { '-': injectGuildRanks },
  conflicts: { rpupgrades: injectRPUpgrades },
  bank: { '-': injectGuildBank },
  hall,
};

function isNewMap() {
  return jQueryPresent() && getElementById('worldPage') && window.GameData;
}

function injectWorld() {
  if (isNewMap()) {
    runDefault(import('./newMap-87323a47.js'));
  }
}

const itemsView = () => { runDefault(import('./itemsView-53427cfb.js')); };

var items = {
  '-': { '-': ufsgAllowBack },
  view: { '-': itemsView },
};

const playerLog = () => { runDefault(import('./playerLog-a72cc114.js')); };
const outbox = () => { runDefault(import('./outbox-c762372b.js')); };

var log$1 = {
  '-': { '-': playerLog },
  outbox: { '-': outbox },
};

const newsFsbox = () => { runDefault(import('./newsFsbox-237ecec2.js')); };
const newsShoutbox = () => { runDefault(import('./newsShoutbox-2b481f77.js')); };

var news$1 = {
  fsbox: { '-': newsFsbox },
  '-': { '-': news },
  shoutbox: { '-': newsShoutbox },
  viewupdatearchive: { '-': viewArchive },
  viewarchive: { '-': viewArchive },
};

const unknownPage = () => { runDefault(import('./unknownPage-0a28fc80.js')); };

var noCmd = {
  viewupdatearchive: { '-': viewArchive },
  viewarchive: { '-': viewArchive },
  '-': { '-': unknownPage },
};

const injectInventoryManagerNew = () => {
  runDefault(import('./inventory-43464cfb.js'));
};
const injectNewGuildLog = () => {
  runDefault(import('./newGuildLog-395c915a.js'));
};
const injectNotepad = () => {
  runDefault(import('./injectNotepad-fd4f9d89.js'));
};
const injectSaveSettings = () => { runDefault(import('./load-0cdb6dd9.js')); };
const reliclist = () => {
  runDefault(import('./reliclist-80890a62.js'));
};
const advisor$1 = () => { runDefault(import('./advisor-157a0eb0.js')); };
const crawler = () => {
  runDefault(import('./crawler-7b23f18d.js'));
};
const newGuildLog5 = () => {
  runDefault(import('./newGuildLog5-abae1087.js'));
};
const whosGotWhat = () => {
  runDefault(import('./whosGotWhat-1721983b.js'));
};

const notepad = {
  showlogs: { '-': injectNotepadShowLogs },
  invmanagernew: { '-': injectInventoryManagerNew }, // TODO
  guildinvmgr: { '-': injectInventoryManagerNew }, // TODO
  recipemanager: { '-': injectRecipeManager },
  auctionsearch: { '-': injectAuctionSearch },
  onlineplayers: { '-': injectOnlinePlayers },
  quicklinkmanager: { '-': injectQuickLinkManager },
  monsterlog: { '-': injectMonsterLog },
  quickextract: { '-': insertQuickExtract },
  quickwear: { '-': insertQuickWear },
  fsboxcontent: { '-': injectFsBoxContent },
  bufflogcontent: { '-': injectBuffLog },
  newguildlog: { '-': injectNewGuildLog }, // TODO
  findbuffs: { '-': injectFindBuffs },
  findother: { '-': injectFindOther },
  savesettings: { '-': injectSaveSettings }, // TODO
  '-': { '-': injectNotepad },
};

// eslint-disable-next-line no-unused-labels, no-labels
devLbl: { //  advisor, crawler, newGuildLog5, whosGotWhat
  notepad.newGuildLog5 = { '-': newGuildLog5 };
  notepad.advisor = { '-': advisor$1 };
  notepad.crawler = { '-': crawler };
  notepad.whosgotwhat = { '-': whosGotWhat };
}

// eslint-disable-next-line no-unused-labels, no-labels
betaLbl: { //  reliclist
  notepad.reliclist = { '-': reliclist };
}

function hideQTip(el) {
  $(el).qtip('hide');
}

function insertHtmlAfterBegin(parent, html) {
  insertHtml(parent, 'afterbegin', html);
}

function saveTempleSettings(needToPray) {
  setValue('needToPray', needToPray);
  setValue('lastTempleCheck', new Date()
    .setUTCHours(23, 59, 59, 999) + 1); // midnight
}

const havePrayedMsg = '<span class="notification-icon"></span>'
  + '<p class="notification-content">'
  + 'You are currently praying at the temple.</p>';
const godsNotification = '<li class="notification">'
  + '<span id="helperPrayToGods" class="fastPray">'
  + '<table><tbody><tr><td>'
  + '<span class="tip-static fshTempleZero" data-tipped="Pray to Sahria" '
  + 'praytype="0"></span></td><td>'
  + '<span class="tip-static fshTempleOne" data-tipped="Pray to Osverin" '
  + 'praytype="1"></span></td></tr><tr><td>'
  + '<span class="tip-static fshTempleTwo" data-tipped="Pray to Gurgriss" '
  + 'praytype="2"></span></td><td>'
  + '<span class="tip-static fshTempleThree" data-tipped="Pray to Lindarsil" '
  + 'praytype="3"></span></td></tr></tbody></table>'
  + `<a href="${cmdUrl}temple">`
  + '<p class="notification-content">Bow down to the gods</p>'
  + '</a></span></li>';

function havePrayed() {
  getElementById('helperPrayToGods').outerHTML = havePrayedMsg;
  saveTempleSettings(false);
}

function prayToGods(e) { // jQuery
  const myGod = e.target.getAttribute('praytype');
  if (!myGod) { return; }
  indexAjaxData({ cmd: 'temple', subcmd: 'pray', type: myGod })
    .then(havePrayed);
  hideQTip(e.target);
}

function displayDisconnectedFromGodsMessage() {
  insertHtmlAfterBegin(getElementById('notifications'), godsNotification);
  once(getElementById('helperPrayToGods'), 'click', prayToGods);
}

function templeAlertEnabled(responseText) {
  let doc;
  if (calf.cmd !== 'temple') {
    doc = createDocument(responseText);
  } else {
    doc = document;
  }
  const checkNeedToPray = querySelector('input[value="Pray to Osverin"]', doc);
  let needToPray = false;
  if (checkNeedToPray) {
    displayDisconnectedFromGodsMessage();
    needToPray = true;
  }
  saveTempleSettings(needToPray);
}

function parseTemplePage(responseText) {
  if (calf.enableTempleAlert) { templeAlertEnabled(responseText); }
}

var profile$2 = {
  '-': { '-': injectProfile },
  managecombatset: { '-': injectProfile },
  report: { '-': injectProfile },
  equipitem: { '-': injectProfile },
  useitem: { '-': injectProfile },
  changebio: { '-': injectBioWidgets },
  dropitems: { '-': injectProfileDropItems },
};

const injectQuestTracker = () => {
  runDefault(import('./injectQuestTracker-4611ae5b.js'));
};

var questbook = {
  '-': { '-': injectQuestBookFull },
  atoz: { '-': injectQuestBookFull },
  viewquest: { '-': injectQuestTracker },
};

const showAllQuestSteps = () => {
  runDefault(import('./showAllQuestSteps-0f549ed8.js'));
};

var quests = {
  '-': { '-': ufsgAllowBack },
  view: { '-': showAllQuestSteps },
};

const injectScavenging = () => {
  runDefault(import('./scavenging-68809492.js'));
};

var scavenging = {
  '-': { '-': injectScavenging },
  process: { '-': injectScavenging },
};

const globalQuest = () => { runDefault(import('./globalQuest-55e6aaef.js')); };
const injectTopRated = () => { runDefault(import('./toprated-2c4a2cf6.js')); };

var toprated = {
  xp: { '-': injectTopRated },
  monthlyxp: { '-': injectTopRated },
  gold: { '-': injectTopRated },
  killstreak: { '-': injectTopRated },
  bounties: { '-': injectTopRated },
  risingstars: { '-': injectTopRated },
  arena: { '-': injectTopRated },
  superelites: { '-': injectTopRated },
  smasher: { '-': injectTopRated },
  globalquest: { '-': globalQuest },
};

const injectTrade = () => { runDefault(import('./trade-79f96a72.js')); };

var trade = {
  '-': { '-': injectTrade },
  sendgold: { '-': injectTrade },
  createsecure: { '-': injectTrade },
  docreatesecure: { '-': injectTrade },
};

const craftForge = () => { runDefault(import('./craftForge-1bd1f100.js')); };
const injectBank = () => { runDefault(import('./injectBank-102e690d.js')); };
const injectBazaar = () => { runDefault(import('./bazaar-9265f935.js')); };
const injectFindPlayer = () => {
  runDefault(import('./injectFindPlayer-8f8bf98a.js'));
};
const injectMailbox = () => { runDefault(import('./mailbox-16ecd7d6.js')); };
const injectQuickBuff = () => {
  runDefault(import('./quickBuff-d28deaf5.js'));
};
const injectTitan = () => { runDefault(import('./injectTitan-fb916247.js')); };
const injectSettings = () => {
  runDefault(import('./injectSettings-bc390107.js'));
};
const ladder = () => { runDefault(import('./ladder-50c9d360.js')); };
const marketplace = () => { runDefault(import('./marketplace-a09b95a9.js')); };
const points = () => { runDefault(import('./points-7dde132a.js')); };
const superelite = () => { runDefault(import('./superelite-13e1ba88.js')); };

var pageSwitcher = {
  settings: { '-': { '-': injectSettings } },
  world: { '-': { '-': injectWorld } },
  news: news$1,
  arena,
  questbook,
  profile: profile$2,
  auctionhouse,
  guild,
  bank: { '-': { '-': injectBank } },
  log: log$1,
  potionbazaar: { '-': { '-': injectBazaar } },
  marketplace: { createreq: { '-': marketplace } },
  quickbuff: { '-': { '-': injectQuickBuff } }, // No ga
  notepad,
  points: { '-': { '-': points } },
  trade,
  titan: { '-': { '-': injectTitan } },
  toprated,
  inventing: { viewrecipe: { '-': inventing } },
  tempinv: { '-': { '-': injectMailbox } },
  findplayer: { '-': { '-': injectFindPlayer } },
  quests, // UFSG
  items, // UFSG
  creatures: { '-': { '-': ufsgAllowBack } }, // UFSG
  masterrealms: { '-': { '-': ufsgAllowBack } }, // UFSG
  realms: { '-': { '-': ufsgAllowBack } }, // UFSG
  relics: { '-': { '-': ufsgAllowBack } }, // UFSG
  shops: { '-': { '-': ufsgAllowBack } }, // UFSG
  scavenging,
  temple: { '-': { '-': parseTemplePage } },
  composing,
  pvpladder: { '-': { '-': ladder } },
  crafting: { '-': { '-': craftForge } },
  hellforge: { '-': { '-': craftForge } },
  superelite: { '-': { '-': superelite } },
  '-': noCmd,
  combat: { attackplayer: { '-': injectProfile } },
};

let cmd;
let subcmd;
let subcmd2;
let type = '';
let coreFunction;
let functionPath;

function getParam(param) {
  return getUrlParameter(param) || '-';
}

function newSelector(selector) {
  const testCmd = querySelector(selector);
  return (testCmd && testCmd.value) || '-';
}

function isValid() {
  return isObject(pageSwitcher[cmd])
    && isObject(pageSwitcher[cmd][subcmd])
    && isFunction(pageSwitcher[cmd][subcmd][subcmd2]);
}

function testCoreFunction() {
  if (isValid()) {
    return pageSwitcher[cmd][subcmd][subcmd2];
  }
}

function getParamsFromUrl() {
  cmd = getParam('cmd');
  subcmd = getParam('subcmd');
  subcmd2 = getParam('subcmd2');
  if (cmd === 'points') { type = `/${getParam('type')}`; }
}

function getParamsFromPage() {
  cmd = newSelector('input[name="cmd"]');
  subcmd = newSelector('input[name="subcmd"]');
  subcmd2 = newSelector('input[name="subcmd2"]');
}

function setCalfParams() {
  calf.cmd = cmd;
  calf.subcmd = subcmd;
  calf.subcmd2 = subcmd2;
}

function getCoreFunction() {
  if (document.location.search !== '') {
    getParamsFromUrl();
  } else {
    getParamsFromPage();
  }
  setCalfParams();
  functionPath = `${cmd}/${subcmd}/${subcmd2}${type}`;
  coreFunction = testCoreFunction();
}

function devHooks() {
  /* eslint-disable no-console */
  console.log('functionPath', functionPath);
  if (!coreFunction) {
    console.log('No Core Function.');
  } else if (!isFunction(coreFunction)) {
    console.log('Not Core Function.');
  }
  /* eslint-enable no-console */
}

function asyncDispatcher() {
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  asyncDispatcher messages
    devHooks();
  }
  if (isFunction(coreFunction)) {
    screenview(functionPath);
    start('JS Perf', functionPath);
    coreFunction();
    end('JS Perf', functionPath);
  }
}

async function runCore(cssPrm) {
  start('JS Perf', 'FSH.runCore');
  initNow();
  initPcc();
  getCoreFunction();
  await cssPrm;
  lookForHcsData();
  add(3, asyncDispatcher);
  isMessageSound();
  /* This must be at the end in order not to
  screw up other findNode calls (Issue 351) */
  doQuickLinks();
  end('JS Perf', 'FSH.runCore');
}

function badEnv() {
  return !isFunction(Object.fromEntries) || !navigator.cookieEnabled;
}

function setVer(fshVer, gmInfo) {
  calf.gmInfo = jsonParse(decodeURIComponent(gmInfo));
  if (calf.gmInfo) {
    calf.fshVer = fshVer;
  } else {
    calf.fshVer = `${fshVer}_native`;
  }
  calf.calfVer = '25';
}

// main event dispatcher
function dispatch(fshVer, gmInfo) {
  start('JS Perf', 'FSH.dispatch');
  if (badEnv()) { return; }
  const cssPrm = loadCss('https://localhost:9966/dist/resources/watch/1524/calfSystem.css');
  globalErrorHandler();
  setVer(fshVer, gmInfo);
  setup();
  runCore(cssPrm);
  end('JS Perf', 'FSH.dispatch');
}

export { escapeHtml as $, setInnerHtml as A, getText as B, searchPlayerUrl as C, querySelector as D, querySelectorArray as E, playerLinkSelector as F, getValue as G, defCharacterVirtualLevel as H, getElementsByClassName as I, defStatLevel as J, getTextTrim as K, quickbuffUrl as L, arrayFrom as M, indexPhp as N, isArray as O, once as P, clickThis as Q, getUrlParameter as R, insertHtml as S, nowSecs as T, scouttowerUrl as U, setValue as V, sendEvent as W, jQueryDialog as X, injectNotepadShowLogs as Y, injectMonsterLog as Z, getCalfPrefs as _, add as a, infoBox as a$, theLinks as a0, playerIdUrl as a1, notepadBlankUrl as a2, fallback as a3, contains as a4, insertHtmlAfterBegin as a5, now as a6, defLastLadderReset as a7, server as a8, cmdUrl as a9, sendGoldonWorld$1 as aA, retryAjax as aB, defStatAttack as aC, defStatDefense as aD, defStatArmor as aE, defStatDamage as aF, defStatHp as aG, cdn as aH, months as aI, defRefreshActionList as aJ, defStairway as aK, defShopPrompt as aL, defViewCreature as aM, jsonParse as aN, executeAll as aO, defFetchPlayerBackpackCount as aP, defControlsKeydown as aQ, places as aR, mercRE as aS, handleEvent as aT, fromEntries as aU, isObject as aV, defaults as aW, time as aX, timeEnd as aY, loadCss as aZ, defTr as a_, pointsUrl as aa, querySelectorAll as ab, sendException as ac, parseError as ad, defFetchPlayerBuffs as ae, defPlayerBuffs as af, defPlayerUpdate as ag, defTeleport as ah, defPvE as ai, isUndefined as aj, isFunction as ak, defAfterUpdateActionlist as al, defFetchWorldRealmDynamic as am, defFetchWorldRealmActions as an, hideQTip as ao, worldUrl as ap, defSubcmd as aq, guideUrl as ar, defRealmUpdate as as, defPlayerLevel as at, keys as au, defenderMultiplier as av, defRelicView as aw, doSendGold as ax, defPlayerGold as ay, initSendGoldOnWorld as az, createDiv as b, defStatbarLevel as b$, profile as b0, off as b1, attribType as b2, itemType as b3, arenaUrl as b4, oldActionSpinner as b5, defTd as b6, playerId as b7, showPlayerUrl as b8, infoBoxFrom as b9, archiveUrl as bA, fshBuffLog as bB, getCustomUrlParameter as bC, composingFragmentType as bD, auctionSearchUrl as bE, getValueJSON as bF, setValueJSON as bG, profileUrl as bH, defCmd as bI, composingUrl as bJ, defNeedToCompose as bK, defLastComposeCheck as bL, screenview as bM, news as bN, injectQuestBookFull as bO, inventing as bP, classHandler as bQ, classPair as bR, injectGuild as bS, defJoinallgroupsundersize as bT, pCR as bU, pCL as bV, bountyUrl as bW, parseTemplePage as bX, displayDisconnectedFromGodsMessage as bY, blacksmithUrl as bZ, dropItemsUrl as b_, containsText as ba, attackplayerUrl as bb, chatSelector as bc, doAddIgnore as bd, combatSelector as be, noteSelector as bf, playerIDRE as bg, tradeUrl as bh, secureUrl as bi, ahSearchUrl as bj, rarity as bk, isString as bl, guildLogUrl as bm, GMSTORAGE_PATH as bn, guildRE as bo, enhancementType as bp, guildViewUrl as bq, daViewProfile as br, lastActivityRE as bs, defEnableGuildActivityTracker as bt, draggable as bu, recallUserUrl as bv, defStatVl as bw, runDefault as bx, asyncPThree as by, updateArchiveUrl as bz, calf as c, injectFsBoxContent as c0, joinallUrl as c1, joinUnderUrl as c2, newGuildLogLoc as c3, newGuildLogUrl as c4, injectAuctionSearch as c5, injectOnlinePlayers as c6, injectFindOther as c7, injectFindBuffs as c8, injectRecipeManager as c9, injectBuffLog as ca, injectQuickLinkManager as cb, auctionhouseUrl as cc, insertQuickExtract as cd, insertQuickWear as ce, dispatch as cf, defTable as d, entries as e, insertHtmlBeforeEnd as f, getElementsByTagName as g, hasClass as h, insertElement as i, jQueryPresent as j, on as k, itemRE as l, getArrayByTagName as m, cElement as n, onclick as o, pCC as p, extend as q, indexAjax as r, partial as s, createDocument as t, indexAjaxData as u, guildSubcmdUrl as v, callApp as w, jQueryNotPresent as x, getElementById as y, setText as z };
//# sourceMappingURL=calfSystem-0ffc234f.js.map
