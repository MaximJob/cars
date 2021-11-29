export default {
  namespaced: true,
  state: {
    volumes: [
      {
        text: "1",
        value: "1.0",
      },
      {
        text: "2",
        value: "2.0",
      },
      {
        text: "3",
        value: "3.0",
      },
      {
        text: "4",
        value: "4.0",
      },
      {
        text: "5",
        value: "5.0",
      },
    ],
    transmissions: [
      {
        text: "Механика",
        value: "механика",
      },
      {
        text: "Автомат",
        value: "автомат",
      },
      {
        text: "Робот",
        value: "робот",
      },
      {
        text: "Вариатор",
        value: "вариатор",
      },
    ],
    engines: [
      {
        text: "Бензин",
        value: "бензин",
      },
      {
        text: "Гибрид",
        value: "гибрид",
      },
      {
        text: "Дизель",
        value: "дизель",
      },
      {
        text: "СУГ",
        value: "бензин",
      },
      {
        text: "Электро",
        value: "электро",
      },
    ],
    bodys: [
      {
        text: "Купе",
        value: "Купе",
      },
      {
        text: "Родстер",
        value: "Родстер",
      },
      {
        text: "Седан",
        value: "Седан",
      },
      {
        text: "Хэтчбек",
        value: "Хэтчбек",
      },
      {
        text: "Внедорожник",
        value: "Внедорожник",
      },
      {
        text: "Универсал",
        value: "Универсал",
      },
      {
        text: "вариатоТарга",
        value: "вариатоТарга",
      },
      {
        text: "Кабриолет",
        value: "Кабриолет",
      },
      {
        text: "Купе - хардтоп",
        value: "Купе - хардтоп",
      },
      {
        text: "Минивэн",
        value: "Минивэн",
      },
      {
        text: "Лифтбек",
        value: "Лифтбек",
      },
      {
        text: "Лимузин",
        value: "Лимузин",
      },
      {
        text: "Пикап",
        value: "Пикап",
      },
      {
        text: "Компактвэн",
        value: "Компактвэн",
      },
      {
        text: "Спидстер",
        value: "Спидстер",
      },
      {
        text: "Фастбек",
        value: "Фастбек",
      },
      {
        text: "Седан - хардтоп",
        value: "Седан - хардтоп",
      },
      {
        text: "Фаэтон",
        value: "Фаэтон",
      },
      {
        text: "Микровэн",
        value: "Микровэн",
      },
      {
        text: "Фургон",
        value: "Фургон",
      },
    ],
  },
  getters: {
    volumes(state) {
      return state.volumes
    },
    transmissions(state) {
      return state.transmissions
    },
    engines(state) {
      return state.engines
    },
    bodys(state) {
      return state.bodys
    },
  }
}