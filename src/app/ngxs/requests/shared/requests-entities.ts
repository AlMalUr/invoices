export function requestEntitiesInitial() {
    return {
      loading: false,
      loaded: false,
      status: '',
      data: null,
    };
  }

export function requestEntitiesLoading() {
    return {
      loading: true,
      loaded: false,
      status: '',
      data: null,
    };
  }

export function requestEntitiesSuccess(payload) {
    return {
      loading: false,
      loaded: true,
      status: 'success',
      data: payload,
    };
  }

export function requestEntitiesFail(payload) {
    return {
      loading: false,
      loaded: true,
      status: 'fail',
      data: payload,
    };
  }

