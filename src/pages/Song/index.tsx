import { Button, Image, Input } from 'antd';
import stepImg from '../../assets/song-step.jpg';

export const Song = () => {
  return (
    <div>
      <div className='w-40'>
        <Image src={stepImg} alt='step' />
      </div>
      <div className='my-8'>从这里复制出来链接，然后粘贴到下面的框框去</div>
      <div>
        <Input placeholder='这里粘贴你的全民 k 歌链接' />
      </div>
      <Button>下载</Button>
    </div>
  );
};
