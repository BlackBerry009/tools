import { useState } from 'react';
import { CustomerServiceOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/love.png';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '1',
    key: '/song',
    icon: <CustomerServiceOutlined />
  }
];

export const LayoutApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const jump2Page = (keyPath: string[]) => {
    navigate(keyPath.join());
  };
  return (
    <Layout className='min-h-screen'>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className='h-16 flex justify-center items-center'>
          <img src={logoImg} alt='logo' className='w-12'></img>
          <span className='text-white ml-5'>工具集</span>
        </div>
        <Menu
          theme='dark'
          defaultSelectedKeys={['1']}
          mode='inline'
          items={items}
          onClick={({ keyPath }) => jump2Page(keyPath)}
        />
      </Sider>
      <Layout>
        <Header className='p-0' />
        <Content className='my-4'>
          <div className='p-6 min-h-90'>
            <Outlet />
          </div>
        </Content>
        <Footer className='text-center'>1</Footer>
        {/* <Footer className='text-center'>为女友准备的工具合集</Footer> */}
      </Layout>
    </Layout>
  );
};
