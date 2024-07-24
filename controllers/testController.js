const Test = require("../models/test");
const TestSchemaModels = async (req, res) => {
    console.log("Loading.....");
    await Test.deleteMany(); 
    const test = new Test({
        email: "mimlyricelx@gmail.com",
        phone: "6575853"
    });
    test.save()
    //await Test.deleteMany({})

    const records = await Test.find({});
    const myCode = test.generateEmailCode()

    let host = req.get("host")
    res.json({"records": records, "host": host})
}

module.exports = {TestSchemaModels}