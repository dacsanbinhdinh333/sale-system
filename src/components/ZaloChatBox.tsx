import React from "react";
import Image from "next/image";
import styles from "./ZaloChatBox.module.css";

const zaloPhone = process.env.NEXT_PUBLIC_ZALO_PHONE;

const ZaloChatBox: React.FC = () => {
    if (!zaloPhone) return null;
    return (
        <a
            href={`https://zalo.me/${zaloPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.zaloChatBox}
        >
            <span className={styles.waveWrapper}>
                <span className={styles.wave1} />
                <span className={styles.wave2} />
            </span>
            <Image
                src="/zalo-icon.webp"
                alt="Zalo Chat"
                width={28}
                height={28}
                className={styles.zaloIcon}
                priority
            />
            <span className={styles.zaloText}>Chat Zalo</span>
        </a>
    );
};

export default ZaloChatBox;
