export default function durabilityRender(data, type, row) {
  if (row.type < 9 && row.max_durability > 0) {
    return Math.ceil(row.durability / row.max_durability * 100);
  }
}
