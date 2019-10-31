import { RequestMakerStore } from '@stoplight/request-maker';
import { IHttpOperation, IHttpRequest } from '@stoplight/types';
import { useRequestMaker } from '../useRequestMaker';

describe('useRequestMaker()', () => {
  test('it should return request maker store given an http operation value', () => {
    const operation = {
      id: 'todo',
      method: 'get',
      path: '/todos',
      request: {
        query: [
          {
            name: 'apikey',
            style: 'form',
          },
        ],
      },
      responses: [
        {
          code: '200',
        },
      ],
    } as IHttpOperation;

    const store = useRequestMaker(operation);

    expect(store).toBeInstanceOf(RequestMakerStore);
    expect(store.operation).toEqual(operation);
  });

  test('it should return request maker store given an http request value', () => {
    const request = {
      method: 'get',
      baseUrl: 'http://todos.stoplight.io',
      url: '/todos',
      headers: {
        'content-type': 'application/json',
      },
      query: {},
    } as IHttpRequest;

    const store = useRequestMaker(request);

    expect(store).toBeInstanceOf(RequestMakerStore);
    expect(store.request.request).toEqual(request);
  });

  test('it should return request maker store given a string value', () => {
    const store = useRequestMaker('foo' as any);

    expect(store).toBeInstanceOf(RequestMakerStore);
    expect(store.request.request).toEqual({
      baseUrl: '',
      url: '',
      method: 'get',
      headers: {},
      query: {},
    });
  });

  test('it should return request maker store given a null value', () => {
    const store = useRequestMaker(null as any);

    expect(store).toBeInstanceOf(RequestMakerStore);
    expect(store.request.request).toEqual({
      baseUrl: '',
      url: '',
      method: 'get',
      headers: {},
      query: {},
    });
  });

  test('it should return cached request maker store with matching operation', () => {
    const operation = {
      id: 'todo',
      method: 'get',
      path: '/todos',
      request: {
        query: [
          {
            name: 'apikey',
            style: 'form',
          },
        ],
      },
      responses: [
        {
          code: '200',
        },
      ],
    } as IHttpOperation;

    const store1 = useRequestMaker(operation, true);
    store1.request.serverUrl = 'http://todos.stoplight.io';
    const store2 = useRequestMaker(operation, true);

    expect(store1).toEqual(store2);
  });

  test('it should return cached request maker store with matching operation', () => {
    const request = {
      method: 'get',
      baseUrl: 'http://todos.stoplight.io',
      url: '/todos',
      headers: {
        'content-type': 'application/json',
      },
      query: {},
    } as IHttpRequest;

    const store1 = useRequestMaker(request, true);
    store1.request.serverUrl = 'http://example.com';
    const store2 = useRequestMaker(request, true);

    expect(store1).toEqual(store2);
  });
});