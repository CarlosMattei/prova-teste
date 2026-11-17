# AngularProvaTeste

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Backend API

Task data comes from the Java Spring Boot API (`java-prova-teste/prova-teste`). Start it first:

```bash
cd ../../java-prova-teste/prova-teste
./mvnw spring-boot:run
```

It listens on `http://localhost:8080` and exposes `GET /tasks`, `GET /tasks/{id}` and `POST /tasks`.
The development server proxies requests under `/api` to it (`/api/tasks` → `/tasks`), so open
`http://localhost:4200/` and the list is loaded from the API.

Editing and deleting are already implemented in `tasks.service.ts`, but the API does not expose
`PUT /tasks/{id}` or `DELETE /tasks/{id}` yet, so those buttons stay disabled. When the backend
adds the routes, set `TASK_EDIT_AVAILABLE` and `TASK_DELETE_AVAILABLE` to `true` in
`src/app/tasks/tasks.service.ts`.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
