const changeTitle = title => {
  document.title = `${title} - Mercado Libre Argentina`;
};

export const setHeadToDefault = () => {
  const title = `Mercado Libre Argentina`;
  const metas = [
    {
      name: "description",
      value:
        "La comunidad de compra y venta online más grande de América Latina."
    }
  ];
  const properties = [
    {
      name: "og:image",
      value:
        "https://http2.mlstatic.com/static/org-img/homesnw/mercado-libre.png?v=2"
    }
  ];
  generate(title, metas, properties);
};

export const generate = (title, metas, properties) => {
  changeTitle(title);
  metas.forEach(meta => {
    const name = meta.name;
    const value = meta.value;
    document.querySelector(`meta[name=${name}]`).setAttribute("content", value);
  });
  properties.forEach(meta => {
    const name = meta.name;
    const value = meta.value;
    console.log(`meta[property="${name}"]`);
    document
      .querySelector(`meta[property="${name}]"`)
      .setAttribute("content", value);
  });
};
