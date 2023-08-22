import React, { useCallback } from 'react';
import {
  Card,
  Text,
  Center,
  Container,
} from '@mantine/core';
import {
  MemoryRouter,
  Outlet,
  Route,
  Routes,
} from 'react-router';
import { Navigation } from '../../contexts/popup/Layouts/Navigation';
import { ExperiencePage } from '../../contexts/popup/Pages/ExperiencePage';
import { AiContentPage } from '../../contexts/popup/Pages/AiContent';

export function Popup() {

  const onClick = useCallback(() => {
    window.open('https://codelucent.com', '_blank');
  }, []);

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '500px',
      }}
    >
      <Center
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img width={200} height={40} src="./Resumely-2.png" onClick={onClick}/>
        <Text
          style={{
            paddingTop: '10px',
            textAlign: 'center',
          }}
        >
          Automatically generate resume summary text using AI for quick copy/paste functionality while applying for jobs!
        </Text>
      </Center>
      <Container
        size="xl"
        sx={() => ({
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          margin: '0',
        })}
      >
         <MemoryRouter initialEntries={["/content"]}>
            <Routes>
              <Route
                path="/"
                element={<Navigation />}
              >
                <Route
                  path="/content"
                  element={
                    <AiContentPage/>
                  }
                />
                <Route
                  path="/experience"
                  element={
                    <Outlet />
                  }
                >
                  <Route
                    index
                    element={
                      <ExperiencePage />
                    }
                  />
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </Container>
      <Center
        style={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text
          size="xs"
        >
          Powered with ♥ by &nbsp;
          <a
            style={{
              textDecoration: 'none',
            }}
            href="https://codelucent.com"
            target="_blank"
            rel="author"
          >
            Codelucent
          </a>
        </Text>
      </Center>
    </Card>
  );
}
