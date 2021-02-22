import React, { lazy, Suspense } from 'react';
import Cookies from 'js-cookie';
import PageHeader from 'components/PageHeader';
import SideNav from 'components/SideNav';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './styles.module.scss';
import { useQuery } from 'react-query';
import { loadProfile } from 'api/profile';
import { SideNavProvider } from 'context/SideNavContext';

const Tasks = lazy(() => import('pages/Tasks'));

export default function PageWrapper() {
  const isAuthenticated = !!Cookies.get('token');
  const { data: profile } = useQuery('profile', loadProfile, { enabled: isAuthenticated });

  if (!isAuthenticated) return <Redirect to="/login" />;
  if (!profile) return null;
  return (
    <SideNavProvider>
      <div className={styles.pageWrapper}>
        <SideNav />
        <div className={styles.mainWrapper}>
          <PageHeader />
          <div className={styles.pageContent}>
            <Suspense fallback={null}>
              <Switch>
                <Route path="/tasks" component={Tasks} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    </SideNavProvider>
  );
}