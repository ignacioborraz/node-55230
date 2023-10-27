export default async (req, res, next) => {
  try {
    const cookie = req.cookies["amUser"];
    const user = jwt.verify(cookie, process.env.JWT);
    if (user) {
      return res.status(200).send({ status: "success", payload: user });
    }
  } catch (error) {
    return res.status(500).send({ status: "fatal", error: error.message });
  }
};
