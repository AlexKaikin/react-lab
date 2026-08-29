export const getNextSubscriptionPeriodEnd = (periodStart: Date) => {
  const periodEnd = new Date(periodStart)
  const periodStartDay = periodStart.getUTCDate()

  periodEnd.setUTCDate(1)
  periodEnd.setUTCMonth(periodEnd.getUTCMonth() + 1)

  const targetMonthLastDay = new Date(Date.UTC(periodEnd.getUTCFullYear(), periodEnd.getUTCMonth() + 1, 0)).getUTCDate()

  periodEnd.setUTCDate(Math.min(periodStartDay, targetMonthLastDay))

  return periodEnd
}
