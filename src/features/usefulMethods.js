export const createTooltip = (d) => {
  let tooltip = "";
  d.PROPS.measures.forEach((measure) => {
    tooltip += "<i>" + measure.name + "<i/>: " + measure.val + "<br />";
  });
  return tooltip;
};
