export const extensiveNumber = (_value: string, _isCurrency?: boolean): string => {
  const list = [
    [
      'zero',
      'um',
      'dois',
      'três',
      'quatro',
      'cinco',
      'seis',
      'sete',
      'oito',
      'nove',
      'dez',
      'onze',
      'doze',
      'treze',
      'quatorze',
      'quinze',
      'dezesseis',
      'dezessete',
      'dezoito',
      'dezenove',
    ],
    [
      'dez',
      'vinte',
      'trinta',
      'quarenta',
      'cinquenta',
      'sessenta',
      'setenta',
      'oitenta',
      'noventa',
    ],
    [
      'cem',
      'cento',
      'duzentos',
      'trezentos',
      'quatrocentos',
      'quinhentos',
      'seiscentos',
      'setecentos',
      'oitocentos',
      'novecentos',
    ],
    [
      'mil',
      'milhão',
      'bilhão',
      'trilhão',
      'quadrilhão',
      'quintilhão',
      'sextilhão',
      'setilhão',
      'octilhão',
      'nonilhão',
      'decilhão',
      'undecilhão',
      'dodecilhão',
      'tredecilhão',
      'quatrodecilhão',
      'quindecilhão',
      'sedecilhão',
      'septendecilhão',
      'octencilhão',
      'nonencilhão',
    ],
  ];

  const value = _value.replace(_isCurrency ? /[^,\d]/g : /\D/g, '').split(',');
  const extenciveNumber = [];

  const e = ' e ';
  const currency = 'real';
  const cents = 'centavo';

  let i = -1;
  let number;
  let parts: string | string[];
  let partI: number;
  let partsLength: number;
  let names: string[] = [];
  let name: string | number = '';

  for (; ++i <= value.length - 1; names = []) {
    i && (value[i] = (parseFloat('.' + value[i]) * 1).toFixed(2).slice(2));

    if (
      !((number = (parts = value[i]).slice((partsLength = parts.length) % 3).match(/\d{3}/g)),
      (parts = partsLength % 3 ? [parts.slice(0, partsLength % 3)] : []),
      (parts = number ? parts.concat(number) : parts)).length
    )
      continue;

    (number = -1), (partsLength = parts.length);

    for (; ++number < partsLength; name = '') {
      if (!(partI = parseFloat(parts[number]) * 1)) continue;

      (partI % 100 < 20 && (name += list[0][partI % 100])) ||
        ((partI % 100) + 1 &&
          (name +=
            list[1][(((partI % 100) / 10) >> 0) - 1] +
            (partI % 10 ? e + list[0][partI % 10] : '')));

      let valExtensiveName = '';
      if (partI < 100) {
        valExtensiveName = name;
      } else {
        valExtensiveName = !(partI % 100)
          ? list[2][partI == 100 ? 0 : (partI / 100) >> 0]
          : list[2][(partI / 100) >> 0] + e + name;
      }

      let valExtensiveType = '';
      if ((name = partsLength - number - 2) > -1) {
        valExtensiveType = ` ${
          partI > 1 && name > 0 ? list[3][name].replace('ão', 'ões') : list[3][name]
        }`;
      }

      names.push(valExtensiveName + valExtensiveType);
    }

    number =
      names.length > 1
        ? ((number = names.pop()), `${names.join(' ')}${e}${number ?? ''}`)
        : names.join('') ||
          ((!i && parseFloat(value[i + 1]) * 1 > 0) || extenciveNumber.length ? '' : list[0][0]);

    // NUMBER PART (MAIN AND DECIMAL)
    let numberPart: string = number;
    if (_isCurrency) {
      if (i) {
        numberPart = parseFloat(parts.join('')) * 1 > 1 ? `${number} ${cents}s` : number + cents;
      } else {
        numberPart =
          parseFloat(parts.join('')) * 1 > 1
            ? `${number} ${/0{6,}$/.test(value[0]) ? 'de ' : ''}${currency.replace('l', 'is')}`
            : number + currency;
      }
    }

    number && extenciveNumber.push(numberPart);
  }

  return extenciveNumber.join(e);
};
