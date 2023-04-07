const fs = require("fs");
const path = require("path");
const db = require("../../database/db");
const { CatController } = require("../../controllers");
const Cat = db.models.cat;
const User = db.models.user;
const mockData = require('../mockData/mockData')

beforeAll(async () => {
  return await db.sync({ force: true, logging: false });
});

afterAll(async () => {
  await Cat.drop();
  return await db.close();
});

describe('CatController.retrieveAll', () => {
  it('should throw 401 error if session is invalid', async () => {
    const mockReq = { session: {} };

    await CatController.retrieveAll(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(401);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Unauthorized!', path: undefined })
    );
  });
  it('should retrieve an empty list of cats send 200 status', async () => {
    const mockSession = { sid: '12345', userId: 2023 }
    const mockReq = { session: mockSession };

    await CatController.retrieveAll(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(200);
    expect(mockData.mockRes.json).toBeCalledWith([]);
  });
  it('should retrieve a list of cats and send 200 status', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    const mockReq = { session: { sid: '12345', userId: user.id } };

    const cat = await Cat.create({
      name: mockData.mockCat.name,
      media: mockData.mockCat.filePath,
      userId: mockReq.session.userId,
    });

    await CatController.retrieveAll(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(200);
    expect(mockData.mockRes.json).toBeCalledWith(expect.arrayContaining([
        expect.objectContaining({
          id: cat.id,
          name: cat.name,
          media: cat.media,
        }),
      ])
    );

  })
});

describe('CatController.retrieveOne', () => {
  it('should throw 401 error if session is invalid', async () => {
    const mockReq = { session: {} };

    await CatController.retrieveOne(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(401);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Unauthorized!', path: undefined })
    );
  });
  it('should throw 404 error if there is no record', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    const mockReq = { 
      params: { 
        id: 20
      },
      session: { 
        sid: '12345',
        userId: user.id
      }
    };

    await CatController.retrieveOne(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(404);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Record not found!', path: undefined })
    );
  });
  it('should retrieve a record and send 200 status', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    const cat = await Cat.create({
      name: mockData.mockCat.name,
      media: mockData.mockCat.filePath,
      userId: user.id,
    });

    const mockReq = { 
      params: { 
        id: cat.id
      },
      session: { 
        sid: '12345',
        userId: user.id 
      }
    };

    await CatController.retrieveOne(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(200);
    expect(mockData.mockRes.sendFile).toBeCalledWith(path.resolve(cat.media));
  });
});

describe('CatController.create', () => {
  it('should throw 401 error if session is invalid', async () => {
    const mockReq = { session: {} };

    await CatController.create(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(401);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Unauthorized!', path: undefined })
    );
  });
  it('should throw 415 error if there is no file provided', async () => {
    const mockSession = { sid: '12345', userId: 2023 }
    const mockReq = { session: mockSession };

    await CatController.create(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(415);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'No file provided!', path: undefined })
    );
  });
  it('should create a record and send 200 status', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    const mockReq = {
      file: {
        path: mockData.mockCat.filePath
      },
      session: { 
        sid: '12345',
        userId: user.id 
      }
    };

    await CatController.create(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(200);
    expect(mockData.mockRes.sendFile).toBeCalledWith(path.resolve(mockData.mockCat.filePath));
  });
});

describe('CatController.retrieveAll', () => {
  it('should throw 401 error if session is invalid', async () => {
    const mockReq = { session: {} };

    await CatController.retrieveAll(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(401);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Unauthorized!', path: undefined })
    );
  });
  it('should retrieve an empty list of cats send 200 status', async () => {
    const mockSession = { sid: '12345', userId: 2023 }
    const mockReq = { session: mockSession };

    await CatController.retrieveAll(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(200);
    expect(mockData.mockRes.json).toBeCalledWith([]);
  });
  it('should retrieve a list of cats and send 200 status', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    const mockReq = { session: { sid: '12345', userId: user.id } };

    const cat = await Cat.create({
      name: mockData.mockCat.name,
      media: mockData.mockCat.filePath,
      userId: mockReq.session.userId,
    });

    await CatController.retrieveAll(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(200);
    expect(mockData.mockRes.json).toBeCalledWith(expect.arrayContaining([
        expect.objectContaining({
          id: cat.id,
          name: cat.name,
          media: cat.media,
        }),
      ])
    );

  })
});

describe('CatController.retrieveOne', () => {
  it('should throw 401 error if session is invalid', async () => {
    const mockReq = { session: {} };

    await CatController.retrieveOne(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(401);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Unauthorized!', path: undefined })
    );
  });
  it('should throw 404 error if there is no record', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    const mockReq = { 
      params: { 
        id: 20
      },
      session: { 
        sid: '12345',
        userId: user.id
      }
    };

    await CatController.retrieveOne(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(404);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Record not found!', path: undefined })
    );
  });
  it('should retrieve a record and send 200 status', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    const cat = await Cat.create({
      name: mockData.mockCat.name,
      media: mockData.mockCat.filePath,
      userId: user.id,
    });

    const mockReq = { 
      params: { 
        id: cat.id
      },
      session: { 
        sid: '12345',
        userId: user.id 
      }
    };

    await CatController.retrieveOne(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(200);
    expect(mockData.mockRes.sendFile).toBeCalledWith(path.resolve(cat.media));
  });
});

describe('CatController.update', () => {
  it('should throw 401 error if session is invalid', async () => {
    const mockReq = { session: {} };

    await CatController.update(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(401);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Unauthorized!', path: undefined })
    );
  });
  it('should throw 415 error if there is no file provided', async () => {
    const mockSession = { sid: '12345', userId: 2023 }
    const mockReq = { session: mockSession };

    await CatController.update(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(415);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'No file provided!', path: undefined })
    );
  });
  it('should throw 404 error if there is no record', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    const mockReq = {
      file: {
        path: mockData.mockCat.filePath
      },
      params: { 
        id: 20
      },
      session: { 
        sid: '12345',
        userId: user.id
      }
    };

    await CatController.update(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(404);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Record not found!', path: undefined })
    );
  });
  it('should update a record and send 200 status', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    await Cat.create({
      name: mockData.mockCat.name,
      media: mockData.mockCat.filePath,
      userId: user.id
    });

    const mockReq = {
      params: {
        id: 2
      },
      body: {
        payload: {
          name: 'kattykat'
        }
      },
      file: {
        path: `nah/${mockData.mockCat.filePath}`
      },
      session: { 
        sid: '12345',
        userId: user.id 
      }
    };

    await CatController.update(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(200);
    expect(mockData.mockRes.json).toBeCalledWith(
      {
        name: mockReq.body.payload.name,
        media: mockReq.file.path,
      },
    );
  });
});

describe('CatController.delete', () => {
  it('should throw 401 error if session is invalid', async () => {
    const mockReq = { session: {} };

    await CatController.delete(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(401);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Unauthorized!', path: undefined })
    );
  });
  it('should throw 404 error if there is no record', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    const mockReq = {
      params: { 
        id: 20
      },
      session: { 
        sid: '12345',
        userId: user.id
      }
    };

    await CatController.delete(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(404);
    expect(mockData.mockRes.send).toBeCalledWith(
      expect.objectContaining({ error: 'Record not found!', path: undefined })
    );
  });
  it('should delete a record and send 200 status', async () => {
    const user = await User.create({
      username: mockData.mockUser.username,
      password: mockData.mockUser.password,
    });

    const cat = await Cat.create({
      name: mockData.mockCat.name,
      media: mockData.mockCat.filePath,
      userId: user.id
    });

    const mockReq = {
      params: {
        id: cat.id
      },
      session: { 
        sid: '12345',
        userId: user.id 
      }
    };

    await CatController.delete(mockReq, mockData.mockRes)

    expect(mockData.mockRes.status).toBeCalledWith(200);
    expect(mockData.mockRes.send).toBeCalledWith('Cat deleted!');
  });
});
