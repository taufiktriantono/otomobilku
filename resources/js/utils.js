
const months = [
  'January',
  'February',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

const formatDate = (value) => {
  const d = new Date(value)
  const day = d.getDate()
  const month = d.getMonth()
  const year = d.getFullYear()
  return `${day} ${months[month]} ${year}`
}

export {
  months,
  formatDate
}