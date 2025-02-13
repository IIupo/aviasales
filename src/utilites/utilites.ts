export const getStopsWord = (count: number): string => {
    if (count === 1) return 'ПЕРЕСАДКА'
    if (count >= 2 && count <= 4) return 'ПЕРЕСАДКИ'
    return 'ПЕРЕСАДОК'
  }

export  const formatDate = (date: string, duration: number) => {
    const departureDate = new Date(date)
    const arrivalDate = new Date(departureDate.getTime() + duration * 60000)
    const departureTime = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const arrivalTime = arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return { departureTime, arrivalTime }
  }