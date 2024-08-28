var stdin_default = {
  name: "Nama",
  tel: "telefon",
  save: "Jimat",
  clear: "Jelas",
  cancel: "Batal",
  confirm: "sahkan",
  delete: "Padam",
  loading: "Memuatkan...",
  noCoupon: "Tiada kupon",
  nameEmpty: "Sila isikan nama",
  addContact: "Tambah kenalan",
  telInvalid: "Nombor telefon cacat",
  vanCalendar: {
    end: "tamat",
    start: "Mulakan",
    title: "Kalendar",
    weekdays: ["matahari", "isn", "Tue", "Rabu", "Kha", "Jum", "Sab"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Pilih tidak lebih daripada ${maxRange} hari`
  },
  vanCascader: {
    select: "Pilih"
  },
  vanPagination: {
    prev: "Sebelumnya",
    next: "Seterusnya"
  },
  vanPullRefresh: {
    pulling: "Tarik untuk menyegarkan...",
    loosing: "Longgar untuk disegarkan..."
  },
  vanSubmitBar: {
    label: "Jumlah:"
  },
  vanCoupon: {
    unlimited: "Tidak terhad",
    discount: (discount) => `${discount * 10}% off`,
    condition: (condition) => `At least ${condition}`
  },
  vanCouponCell: {
    title: "kupon",
    count: (count) => `Anda mempunyai kupon ${count}.`
  },
  vanCouponList: {
    exchange: "Pertukaran",
    close: "tutup",
    enable: "Tersedia",
    disabled: "Tidak ada",
    placeholder: "Kod Kupon"
  },
  vanAddressEdit: {
    area: "Kawasan",
    areaEmpty: "Sila pilih kawasan penerimaan",
    addressEmpty: "Alamat tidak boleh kosong",
    addressDetail: "Alamat",
    defaultAddress: "Tetapkan sebagai alamat lalai"
  },
  vanAddressList: {
    add: "Tambah alamat baharu"
  }
};
export {
  stdin_default as default
};
