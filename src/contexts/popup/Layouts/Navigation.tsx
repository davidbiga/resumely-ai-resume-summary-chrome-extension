import React from 'react';
import {
  Container,
  Group,
  Tabs,
} from '@mantine/core';
import {useCallback, useEffect, useState} from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router';
import {
  Article,
  Confetti,
} from 'tabler-icons-react';

type NavLayoutProps = {
};

export function Navigation ({} : NavLayoutProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(1);

  const navigate = useNavigate();

  const onTabChange = useCallback((
    active: number,
    tabKey: string,
  ) => {
    setActiveTab(active);
    navigate(tabKey);
  }, [navigate, setActiveTab]);

  useEffect(() => {
    if (
      location.pathname.startsWith('/experience') &&
      activeTab !== 0
    ) {
      setActiveTab(0);
    } else if (
      location.pathname.startsWith('/content') &&
      activeTab !== 1
    ) {
      setActiveTab(1);
    }
  }, [location, activeTab, setActiveTab]);

  return (
    <>
      <Group
        spacing={0}
        noWrap={true}
        style={{
          height: '40px',
        }}
      >
        <Tabs
          active={activeTab}
          onTabChange={onTabChange}
          style={{
            height: '100%',
            width: '100%',
            display: 'flex'
          }}
        >
          <Tabs.Tab
            label="Your Experience"
            tabKey="/experience"
            icon={<Article />}
          />
          <Tabs.Tab
            label="AI Content"
            tabKey="/content"
            icon={<Confetti />}
          />
        </Tabs>
      </Group>
      <Container
        size="xl"
        sx={() => ({
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          margin: '0',
          height: 'calc(100vh - 40px)',
        })}
      >
        <Outlet />
      </Container>
    </>
  );
}
