const assetFieldMap = new Map([
  ["id", "Id"],
  ["createdDate", "Created"],
  ["modifiedDate", "Modified"],
  ["assetId", "Asset Id"],
  ["tagNumber", "Tag No."],
  ["rateUnit", "Unit"],
  ["firstName", "First Name"],
  ["secondName", "Second Name"],
  ["phoneNum", "Phone"],
]);

const reverseFieldMap = new Map();
assetFieldMap.forEach((value, key) => {
  reverseFieldMap.set(value, key);
});

function capitaliseFirstLetter(str) {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function decapitaliseFirstLetter(str) {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function getAssetFriendlyName(fieldName) {
  if (assetFieldMap.has(fieldName)) {
    return assetFieldMap.get(fieldName);
  } else {
    return capitaliseFirstLetter(fieldName);
  }
}

export function getAssetVariableName(friendlyName) {
  // Check if the friendly name exists in the reverse mapping
  if (reverseFieldMap.has(friendlyName)) {
    return reverseFieldMap.get(friendlyName);
  } else {
    // If the friendly name is not found in the reverse mapping, return the original friendly name
    return decapitaliseFirstLetter(friendlyName);
  }
}
