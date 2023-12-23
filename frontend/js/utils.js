export function dateConverter(fechaISO) {
  const dateUTC = new Date(fechaISO);

  const dateLocal = dateUTC.toLocaleDateString();
  const hourLocal = dateUTC.toLocaleTimeString();

  const formatedDate = `${dateLocal} ${hourLocal}`;

  return formatedDate;
}