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

It listens on `http://localhost:8080` and exposes the full task CRUD: `GET /tasks`,
`GET /tasks/{id}`, `POST /tasks`, `PUT /tasks/{id}`, `PATCH /tasks/{id}/status` and
`DELETE /tasks/{id}`. The development server proxies requests under `/api` to it
(`/api/tasks` → `/tasks`), so open `http://localhost:4200/` and the list is loaded from the API.

The UI uses every route: the header button creates tasks (`POST`), the pencil icon edits them
(`PUT`), the trash icon deletes them (`DELETE`) and the status selector in the details panel
changes only the status (`PATCH /tasks/{id}/status`).

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
