## REST API with NodeJs and Express Framework  and JWT 

### End points are:
```
BASE_URL='https://u4saif.herokuapp.com/api 
```
```
For post : /post/count?limit=10 , For Delete : /delete/'+ id
```
 
 Make Sure you Have Auth Token in your API Header like below: 

 ```
 intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    if (localStorage.getItem("token")) {
      let token= "bear "+ localStorage.getItem("token");
      const RequestWithToken = req.clone({
        
        headers: req.headers.set('Authorization', token),
      });
      return next.handle(RequestWithToken);
    }
    return next.handle(req);
}
 ```