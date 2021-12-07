export const mask = (v: string) => {
  v = v.replace(/\D/g, '');

  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    v = v.replace(/^(\d{2})(\d)/, '$1.$2');
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
  }

  return v;
};

export const maskTel = (tel: string) => {
  tel = tel.replace(/\D/g, '');
  tel = tel.replace(/(.{0})(\d)/, '$1($2');
  tel = tel.replace(/(.{3})(\d)/, '$1)$2');
  tel = tel.replace(/(.{4})(\d)/, '$1 $2');
  if (tel.length === 13) {
    tel = tel.replace(/(.{4})$/, '-$1');
  } else if (tel.length === 14) {
    tel = tel.replace(/(.{4})$/, '-$1');
  }

  return tel;
};

export const maskZipcode = (zp: string) => {
  zp = zp.replace(/\D/g, '');

  zp = zp.replace(/(\d{2})(\d)/, '$1-$2');
  zp = zp.replace(/(\d{3})(\d)/, '$1-$2');
  zp = zp.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return zp;
};
