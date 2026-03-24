function getQrSizeByLabel(size) {
  // Keep QR itself permanently compact in customize preview.
  return 150;
}

function getPreviewScaleBySize(size) {
  if (size === "Small") return 0.82;
  if (size === "Medium") return 0.92;
  if (size === "Large") return 1;
  if (size === "Extra Large") return 1.08;
  return 1;
}

function getPreviewWidthBySize(size) {
  if (size === "Small") return "76%";
  if (size === "Medium") return "86%";
  if (size === "Large") return "96%";
  if (size === "Extra Large") return "100%";
  return "96%";
}

export { getQrSizeByLabel, getPreviewScaleBySize, getPreviewWidthBySize };
