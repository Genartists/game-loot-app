const BASE_URL = "https://www.gamerpower.com/api";

export const getGiveaways = async (params = {}) => {
  const url = new URL(`${BASE_URL}/giveaways`);

  // Add query parameters
  if (params.platform) url.searchParams.append("platform", params.platform);
  if (params.type) url.searchParams.append("type", params.type);
  if (params["sort-by"]) url.searchParams.append("sort-by", params["sort-by"]);

  console.log("🔍 Fetching giveaways from:", url.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    console.error("❌ API Error:", response.status, response.statusText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("✅ Giveaways response:", data);
  return data;
};

export const getGiveaway = async (id) => {
  const url = `${BASE_URL}/giveaway?id=${id}`;
  console.log("🔍 Fetching giveaway details from:", url);

  const response = await fetch(url);

  if (!response.ok) {
    console.error("❌ API Error:", response.status, response.statusText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("✅ Giveaway details response:", data);
  return data;
};

export const getWorth = async (params = {}) => {
  const url = new URL(`${BASE_URL}/worth`);

  // Add query parameters for worth
  if (params.platform) url.searchParams.append("platform", params.platform);
  if (params.type) url.searchParams.append("type", params.type);

  console.log("🔍 Fetching worth from:", url.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    console.error("❌ API Error:", response.status, response.statusText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("✅ Worth response:", data);
  return data;
};
