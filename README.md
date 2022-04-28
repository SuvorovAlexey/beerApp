# beerApp

## How to start
1. Install Node.js (if there is a need)
`https://nodejs.org/en/download/`
2. Clone project  
`git clone https://github.com/SuvorovAlexey/beerApp.git`
3. Install the Angular CLI
`npm install -g @angular/cli`
4. Go to project folder
5. Install packages
`npm i`
6. Run project in browser
`ng serve --open`
7. Enjoy =)


## Notes about Project
1. I don`t use any dependencies (only Angular + Angular Material)
2. I noticed that the values in the stream have different values. 
First they increase, then they may fall, but _I implemented an upstream only value flow_ to simplify.
3. I don't use state libraries like Redux, but I still keep the weighted ingredients (more info in the comments in beer-change.service.ts)
4. I use Weight screen as part of Beer Details screen for user convenience, but the Weight screen remains a separate component.
5. I add a pagination (it wasn't in the test description).


## User flow
1. Firstly we see a Main page. We can click by some beer (and go to Beer page) and click by pagination page (and fetch new beers).
2. On Beer page we see current beer info and ingredients (Hops and Malt). We can weight each ingredient.
3. If we click on weight button near ingredient, Weight Page will be open.
4. On Weight page we should click to "Start" button and weighing process will be started.
5. After weighing process we may save current result with button 'Save this ingredient'.
6. After save local ingredient, we will see "Save all ingredients and back to home". If we push them, we will save all results and go to Home page.
7. If we before saved ingredients we may open a beer and see saved ingredients (if we don`t fetch other beer pages, to resolve this case _in production_ we can use something like Redux or save results on Backend). 
