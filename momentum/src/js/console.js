const styles = [
  "font-size: 30px; color: rgb(2, 120, 151); text-decoration: underline;",
  "font-size: 14px; color: rgb(2, 120, 151);",
  "font-size: 14px; color: #fff; background-color: #8AB4F8; border-radius: 35%; padding: 2px;",
  "font-size: 12px; color: rgb(2, 120, 151);",
];

console.log("%cСамооценка", styles[0]);
console.log("%c1. Часы и календарь %c+15", styles[1], styles[2]);
console.log("%c2. Приветствие %c+10", styles[1], styles[2]);
console.log("%c3. Смена фонового изображения %c+20", styles[1], styles[2]);
console.log("%c4. Виджет погоды %c+15", styles[1], styles[2]);
console.log("%c5. Виджет цитата дня %c+10", styles[1], styles[2]);
console.log("%c6. Аудиоплеер %c+15", styles[1], styles[2]);
console.log(
  "%c7. Продвинутый аудиоплеер (реализуется без использования библиотек) %c+20",
  styles[1],
  styles[2]
);
console.log(
  "%c8. Перевод приложения на два языка (en/ru или en/be) %c+15",
  styles[1],
  styles[2]
);
console.log(
  "%c9. Получение фонового изображения от API %c+10",
  styles[1],
  styles[2]
);
console.log("%c10. Настройки приложения %c+20", styles[1], styles[2]);
console.log(
  "%c11. Дополнительный функционал на выбор (Todo) %c+10",
  styles[1],
  styles[2]
);
console.log(
  "%cP.S. Если вам не понятно, как использовать 'Todo', при его открытии есть описание. Оно переводится на русский и на английский через выбор языка в меню",
  styles[3]
);

console.log("%cИтого: 160/160", styles[0]);
console.log(
  "%cНадеюсь вам понравилось моя работа. Буду рад видеть ваши замечания и предложения по улучшению в дискорд BlackBerryID #3277. Хорошего дня!",
  styles[3]
);
