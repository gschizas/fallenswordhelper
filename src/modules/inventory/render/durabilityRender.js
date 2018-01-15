export default function durabilityRender(data, type, row) {
  if (parseInt(row.max_durability, 10) > 0) {
    return Math.ceil(row.durability / row.max_durability * 100);
  }
}
