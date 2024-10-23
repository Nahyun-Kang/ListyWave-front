import Image from 'next/image';
import Link from 'next/link';

import { NOTICE_DETAIL_MOCKDATA } from '../mockdata';
import { NoticeContentType } from '@/lib/types/noticeType';

import * as styles from './NoticeDetail.css';

function NoticeDetailComponent() {
  const data = NOTICE_DETAIL_MOCKDATA;

  return (
    <>
      <section className={styles.titleSection}>
        <ul className={styles.categoryList}>
          {data.category.map((el, idx) => (
            <li key={idx.toString()}>
              <div className={styles.category}>{el}</div>
            </li>
          ))}
        </ul>
        <h3 className={styles.title}>{data.title}</h3>
        <div className={styles.titleSectionDescription}>{data.description}</div>
        <p className={styles.titleSectionCreatedDate}>{data.createdDate}</p>
      </section>
      <article className={styles.articleWrapper}>
        <ul>
          {data.content?.map((item: NoticeContentType, idx) => (
            <li key={idx.toString()}>
              <NoticeContent item={item} />
            </li>
          ))}
        </ul>
      </article>
      <section className={styles.signPostWrapper}>
        <div className={styles.listItemWrapper}>
          <div className={styles.sign}>다음글</div>
          <div className={styles.noticeTitle}>{data.prevNotice.title}</div>
          <p className={styles.noticeDescription}>{data.prevNotice.description}</p>
        </div>
        <div className={styles.listItemWrapper}>
          <div className={styles.sign}>이전글</div>
          <div className={styles.noticeTitle}>{data.nextNotice.title}</div>
          <p className={styles.noticeDescription}>{data.nextNotice.description}</p>
        </div>
        <Link href={'/notices'}>
          <button className={styles.link}>목록보기</button>
        </Link>
      </section>
    </>
  );
}

export default NoticeDetailComponent;

interface NoticeContentProps {
  item: NoticeContentType;
}

function NoticeContent({ item }: NoticeContentProps) {
  return (
    <>
      {item.type === 'subtitle' && <h4 className={styles.articleSubtitle}>{item.description}</h4>}
      {item.type === 'body' && <p className={styles.articleDescription}>{item.description}</p>}
      {item.type === 'image' && (
        <div className={styles.articleImageWrapper}>
          <Image src={item.imageUrl} alt={item.type} fill className={styles.articleImage} />
        </div>
      )}
      {item.type === 'button' && (
        <Link href={item.buttonLink}>
          <button className={styles.articleButton}>{item.buttonName}</button>
        </Link>
      )}
      {item.type === 'line' && <div className={styles.articleLine}></div>}
      {item.type === 'notice' && <p className={styles.articleNotice}></p>}
      {/* <h4 className={styles.articleSubtitle}>{'대충 소제목'}</h4>
      <p className={styles.articleDescription}>
        {'대충 줄글이에요~대충 줄글이에요~대충 줄글이에요~대충 줄글이에요~대충 줄글이에요~대충 줄글이에요~'}
      </p>
      <div className={styles.articleImageWrapper}>
        <Image
          src={'https://newsimg.sedaily.com/2022/10/11/26CB5S28AA_11.png'}
          alt={item.type}
          fill
          className={styles.articleImage}
        />
      </div>
      <Link href={item.buttonLink}>
        <button className={styles.articleButton}>{item.buttonName}</button>
      </Link>
      <div className={styles.articleLine}></div>
      <p className={styles.articleNotice}>{'노티스예염'}</p> */}
    </>
  );
}