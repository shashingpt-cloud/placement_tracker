export default async function handler(req, res) {
    try {
        const { username } = req.query;

        if (!username) {
            return res.status(400).json({
                error: "Username is required"
            });
        }

        const response = await fetch(
            `https://alfa-leetcode-api.onrender.com/${username}/solved`
        );

        const data = await response.json();

        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}
