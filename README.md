# FrontendDeveloperExercise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running code coverage

Run `npm run showCoverage` to generate a coverage report.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### What I have done
#### Getting started with angular-cli
I use CSS processor as SASS in the project. It is configured while creating a new app.

#### Installing angular-cli

```bash
npm i -g @angular/cli
ng new frontend-developer-exeercise
cd frontend-developer-exeercise
ng serve or npm run start
```

#### Adding ngx-bootstrap

-   Install `ngx-bootstrap` and `bootstrap`

 ```bash
      npm install ngx-bootstrap bootstrap --save
 ```

-   Open `angular.json` and insert a new entry into the styles array:

```json
      "styles": [
         "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "styles.css",
      ],
```

-   Open `src/app/app.module.ts` and add:

```typescript
import { AccordionModule } from 'ngx-bootstrap/accordion';
...

@NgModule({
   ...
   imports: [AccordionModule.forRoot(), ... ],
   ...
})
```

-   Open `src/app/weather.component.html` and add:

```html
    <accordion-group ...>...</accordion-group>
```
