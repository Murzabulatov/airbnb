const date1 = new Date('1995-12-15T03:24:00');
const date2 = new Date('1995-12-17T03:24:00');

for (let iter = date1.valueOf(); iter <= date2.valueOf(); iter += 86400000) {
  const tempData = new Date(iter);

  console.log(
    `${tempData.getFullYear()}/${tempData.getMonth()}/${tempData.getDay()}`
  );
}
