export const convertDate = (date: string) => {
  const [year, month, day] = date.split('-')
  return `${month}월 ${day}일`
}