import { STATUSES } from '@bull-board/api/src/constants/statuses';
import { AppQueue } from '@bull-board/api/typings/app';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { STATUS_LIST } from '../../constants/status-list';
import { QueueDropdownActions } from '../QueueDropdownActions/QueueDropdownActions';
import s from './StatusMenu.module.css';

export const StatusMenu = ({ queue, actions }: { queue: AppQueue; actions: any }) => {
  const { url } = useRouteMatch();

  return (
    <div className={s.statusMenu}>
      {STATUS_LIST.map((status) => {
        const isLatest = status === STATUSES.latest;
        const displayStatus = status.toLocaleUpperCase();
        return (
          <NavLink
            to={`${url}${isLatest ? '' : `?status=${status}`}`}
            activeClassName={s.active}
            isActive={(_path, { search }) => {
              const query = new URLSearchParams(search);
              return query.get('status') === status || (isLatest && query.get('status') === null);
            }}
            key={`${queue.name}-${status}`}
          >
            <span title={displayStatus}>{displayStatus}</span>
            {queue.counts[status] > 0 && <span className={s.badge}>{queue.counts[status]}</span>}
          </NavLink>
        );
      })}
      {!queue.readOnlyMode && (
        <div>
          <QueueDropdownActions queue={queue} actions={actions} />
        </div>
      )}
    </div>
  );
};
