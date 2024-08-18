'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import HomeIcon from '/public/icons/ver3/house.svg';
import MyFeedIcon from '/public/icons/ver3/square_pencil.svg';
import AddIcon from '/public/icons/ver3/add.svg';

import useMoveToPage from '@/hooks/useMoveToPage';
import useBooleanOutput from '@/hooks/useBooleanOutput';

import { useUser } from '@/store/useUser';

import { vars } from '@/styles/theme.css';
import * as styles from './BottomNav.css';

import Modal from '../Modal/Modal';
import LoginModal from '../login/LoginModal';

export default function BottomNav() {
  const { user } = useUser();
  const router = useRouter();
  const userId = user.id;
  const pathname = usePathname() as string;
  const { onClickMoveToPage } = useMoveToPage();
  const { isOn, handleSetOff, handleSetOn } = useBooleanOutput();

  // 숨기고 싶은 경로 패턴 배열
  const hiddenPaths = [
    '/list',
    '/intro',
    '/start-listy',
    '/account',
    '/followings',
    '/followers',
    '/notification',
    '/withdrawn-account',
  ];
  const isHidden = hiddenPaths.some((path) => pathname.includes(path));

  if (isHidden) return;

  //파란색 선택 표시를 위한 분기처리
  const selectedItem = (() => {
    if (pathname === '/' || pathname.includes('/search')) {
      return 'explore';
    } else if (pathname === `/user/${userId}/mylist` || pathname === `/user/${userId}/collabolist`) {
      return 'my-feed';
    } else {
      return null;
    }
  })();

  // 로그인한 사용자 검증
  const handleMoveToPageOnLogin = (path: string) => () => {
    if (!userId) {
      handleSetOn();
      return;
    }
    path === 'my-feed' ? router.push(`/user/${userId}/mylist`) : router.push('/collection');
  };

  return (
    <>
      <nav className={styles.navDiv}>
        <ul className={styles.ulDiv}>
          <li className={styles.buttonDiv} onClick={onClickMoveToPage('/')}>
            <HomeIcon fill={selectedItem === 'explore' ? '#53A0FF' : vars.color.gray7} />
            <span className={selectedItem === 'explore' ? `${styles.selectedMenuName}` : `${styles.menuName}`}>홈</span>
          </li>
          <li className={styles.buttonDiv}>
            <div className={styles.createButtonWrapper}>
              <div className={styles.listCreateButton}></div>
              <AddIcon className={styles.addIcon} />
            </div>
          </li>
          <li className={styles.buttonDiv} onClick={handleMoveToPageOnLogin('my-feed')}>
            <MyFeedIcon fill={selectedItem === 'my-feed' ? '#53A0FF' : vars.color.gray7} />
            <span className={selectedItem === 'my-feed' ? `${styles.selectedMenuName}` : `${styles.menuName}`}>
              마이피드
            </span>
          </li>
        </ul>
      </nav>
      {isOn && (
        <Modal handleModalClose={handleSetOff} size="large">
          <LoginModal id="bottomNavLoginBtn" />
        </Modal>
      )}
    </>
  );
}
