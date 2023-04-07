const mockUser = {
  username: "user",
  password: "password"
}

const mockCat = {
  name: "cattycat",
  filePath: "path/of/cat.png"
}

const mockRes = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
  sendFile: jest.fn()
};


module.exports = {
  mockCat,
  mockRes,
  mockUser
}
