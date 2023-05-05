import mysqlx from '@mysql/xdevapi';


/*
export async function readEventApplication(event, user_id) {
  try {
    const session = await mysqlx.getSession(process.env.MYSQLX_CONFIG);

    const response = await session
        .sql('CALL read_event_application(?, ?);')
        .bind(event, user_id)
        .execute();

    const data = await response.fetchAll();

    return {
      data,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error.message
      }
    };
  }
}
*/

export async function readEventApplication(event, user_id) {
  try {
    return mysqlx.getSession(process.env.MYSQLX_CONFIG)
      .then(session => {
        return session
            .sql('CALL read_event_application(?, ?);')
            .bind(event, user_id)
            .execute();
      })
      .then(res => res.fetchAll()).catch(err => {});
  } catch (error) {
    console.error(error);
  }
}

export async function createEventApplication(event, user_id, application) {
  const values = Array.from(Object.values(application));

  try {
    return mysqlx.getSession(process.env.MYSQLX_CONFIG)
      .then(session => {
        return session
            .sql('CALL create_event_application(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);')
            .bind(user_id, event, ...values)
            .execute();
      }).catch(err => {});
  } catch (error) {
    console.error(error);
  }
}







/*
export async function createEventApplication(event, user_id, { application }) {
  try {
    mysqlx.getSession(process.env.MYSQLX_CONFIG)
      .then(session => {
        return session.sql('CALL create_event_application(?, ?);').bind(event, user_id).execute();
      })
      .then(res => res.fetchAll())
  } catch (error) {
    console.error(error);
  }
}

export async function createEventApplication(event, user_id, { application }) {
  try {
    const session = await mysqlx.getSession(process.env.MYSQLX_CONFIG);

    const response = await session
        .sql('CALL read_event_application(?, ?);')
        .bind(event, user_id)
        .execute();

    const data = await response.fetchAll();

    return {
      data,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error.message
      }
    };
  }
}
*/