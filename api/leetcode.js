export default async function handler(req, res) {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({
        error: "Username is required",
      });
    }

    const response = await fetch(
      `https://alfa-leetcode-api.onrender.com/${username}/solved`
    );

    // External API failed
    if (!response.ok) {
      const text = await response.text();

      console.error("LeetCode API Error");
      console.error("Status:", response.status);
      console.error("Body:", text);

      return res.status(response.status).json({
        error: "LeetCode API unavailable",
      });
    }

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Invalid JSON received");
      console.error(text);

      return res.status(502).json({
        error: "Invalid response from LeetCode API",
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error("SERVER ERROR");
    console.error(err);

    return res.status(500).json({
      error: err.message,
    });
  }
}
