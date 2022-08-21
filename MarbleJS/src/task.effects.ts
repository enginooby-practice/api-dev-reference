import {catchError, map, mergeMap} from 'rxjs/operators';
import {taskRepository} from "./_Shared/JavaScript/repositories/repositoryManager";
import {HttpError, HttpStatus, r} from "@marblejs/http";
import {from, throwError} from 'rxjs';
import {Task} from "./_Shared/JavaScript/models/task/Task";

const baseUrl = "/api/tasks";

const getAll$ = r.pipe(
    r.matchPath(baseUrl),
    r.matchType('GET'),
    r.useEffect(req$ => {

        return req$.pipe(
            mergeMap(taskRepository.getAll),
            map(body => ({status: 200, body})),
        );
    }));

const getById$ = r.pipe(
    r.matchPath(`${baseUrl}/:id`),
    r.matchType('GET'),
    r.useEffect(req$ => {

        return req$.pipe(
            // @ts-ignore
            map(req => req.params.id),
            mergeMap(id =>
                from(taskRepository.getById(id))
                    .pipe(catchError(() => throwError(
                            () => new HttpError('Task does not exist', HttpStatus.NOT_FOUND)
                        )),
                    )),
            map(user => ({body: user})),
        );
    }));

const deleteById$ = r.pipe(
    r.matchPath(`${baseUrl}/:id`),
    r.matchType('DELETE'),
    r.useEffect(req$ => {

        return req$.pipe(
            // @ts-ignore
            map(req => req.params.id),
            mergeMap(id =>
                from(taskRepository.delete(id))
                    .pipe(catchError(() => throwError(
                            () => new HttpError('Task does not exist', HttpStatus.NOT_FOUND)
                        )),
                    )),
            map(user => ({body: user})),
        );
    }));

const createTask$ = r.pipe(
    r.matchPath(baseUrl),
    r.matchType('POST'),
    r.useEffect(req$ => {

        return req$.pipe(
            map(req => req.body),
            mergeMap(dto => from(taskRepository.create(dto))),
            map(body => ({body})),
        );
    }));

const updateTask$ = r.pipe(
    r.matchPath(`${baseUrl}/:id`),
    r.matchType('PATCH'),
    r.useEffect(req$ => {

        return req$.pipe(
            mergeMap(req => from(taskRepository.update(req.params["id"], req.body as Task))),
            map(body => ({body})),
        );
    }));

export const taskController = [
    getAll$,
    getById$,
    deleteById$,
    createTask$,
    updateTask$
];