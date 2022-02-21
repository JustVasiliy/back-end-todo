import request from "supertest";
const baseUrl = 'http://localhost:3000';
const app = require('../server/server')
const server = app.listen(3000);

describe('Todos endpoint', () => {
 
	it('should return a 200 status code', async () => {
		const response = await request(baseUrl)
			.get('/api/task/get');
   
		expect(response.statusCode).toBe(401);
    
    
    
	});
	afterAll(()=>{
		server.close()
	})
  
})

