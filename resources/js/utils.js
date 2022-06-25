
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

const nomorHandphoneFormatIndonesia = (value) => {
  if (!value.startsWith('62')) {
    
  }
  return value
}

export {
  months,
  formatDate
}