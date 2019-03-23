// Create a reusable style
const ExcelStyles = () => {
  const defaultStyle = {
    font: {
      color: "#000000",
      size: 12
    },
    alignment: {
      shrinkToFit: false,
      wrapText: true
    }
  };

  const numberStyle = {
    font: {
      color: "000000",
      size: 12
    },
    numberFormat: "###0;"
  };

  const boldStyle = {
    font: {
      color: "#000000",
      size: 14,
      bold: true
    },
    alignment: {
      shrinkToFit: false,
      wrapText: true
    }
  };
  return {
    defaultStyle,
    numberStyle,
    boldStyle
  };
};

// export the picturecontroller
module.exports = ExcelStyles;
