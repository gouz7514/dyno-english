export const convertDate = (date: string) => {
  const [year, month, day] = date.split('-')
  return `${month}월 ${day}일`
}

export const convertTimeToHHMM = (time: string) => {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
}

export const convertTimeToMMDD = (time: string) => {
  const date = new Date(time)
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${month}월 ${day}일`
}