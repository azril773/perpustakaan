const format = (date) => {
  const regexTime =
    /^\d{4}[-\/\:_.]\d{1,}[-\/\:_.]\d{2}\s\d{2}[-\/\:_.]\d{2}[-\/\:_.]\d{2}$/;
  const regex = /^\d{4}[-\/\:_.]\d{2}[-\/\:_.]\d{2}/;
  let str;
  const pisah = date.split(" ");
  const tanggal = pisah[0]
    .toString()
    .split(/[\/\-_.]/)
    .join("-");

  if (!pisah[1]) {
    const cekTanggal = regex.test(date);
    if (cekTanggal) {
      return tanggal;
    } else {
      const regexReplace = /(\d+)-(\d+)-(\d+)/;
      const baru = tanggal.replace(regexReplace, "$3-$2-$1");
      return baru;
    }
  } else {
    const cek = regexTime.test(date);
    const cekTime = /^\d{2}[-\/\:_.]\d{2}[-\/\:_.]\d{2}$/;
    if (cekTime.test(pisah[1])) {
      const waktu = pisah[1]
        .toString()
        .split(/[-\/:_.]/)
        .join(":");
      console.log(waktu);
      console.log(cek);
      if (cek) {
        return tanggal + " " + waktu;
      } else {
        const regexReplace = /(\d+)-(\d+)-(\d+)/;
        const baru = tanggal.replace(regexReplace, "$3-$2-$1");
        console.log(baru);
        return baru + " " + waktu;
      }
    } else {
      return false;
    }
  }
};

const count = (datePinjam, ta = "n") => {
  const date = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });
  const now = format(date);
  let ms;
  if (ta == "n") {
    ms = new Date(now).getTime() - new Date(datePinjam).getTime();
  } else {
    ms = new Date(datePinjam).getTime() - new Date(now).getTime();
  }
  const detik = 1000;
  const menit = detik * 60;
  const jam = menit * 60;
  const hari = jam * 24;

  const hariCount = Math.floor(ms / hari);
  const jamCount = Math.floor((ms % hari) / jam);
  const menitCount = Math.floor((ms % jam) / menit);
  const detikCount = Math.floor((ms % menit) / detik);

  return hariCount;
};

const dateId = () => {
  const date = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });
  return format(date);
};
module.exports = { format, count, dateId };
