"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'

export default function Home() {
  const [wakeLock, setWakeLock] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('wakeLock' in navigator);

    const acquireWakeLock = async () => {
      try {
        const wakeLockRequest = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active!');
        setWakeLock(wakeLockRequest);

        wakeLockRequest.addEventListener('release', () => {
          console.log('Wake Lock was released by the system');
          // Re-acquire the wake lock if it's released by the system.
          acquireWakeLock();
        });
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };

    if (isSupported) {
      acquireWakeLock();
    }

    return () => {
      if (wakeLock) {
        wakeLock.release()
          .then(() => {
            console.log('Wake Lock successfully released (on unmount)');
          })
          .catch((err) => {
            console.error(`Failed to release wake lock: ${err.name}, ${err.message}`);
          });
      }
    };
  }, [isSupported]);

  return (
    <div className="cursor-none ">
      <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed pt-[38%]">
        <Ring
          size="35"
          stroke="5"
          bgOpacity="0"
          speed="2.3"
          color="white"
        />
      </div>
      <Image
        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed pb-[10%]"
        src="/win11.png"
        width={330}
        height={330}
        alt="Windows Logo"
      >

      </Image>
      {isSupported ? (
        <p hidden>Awake: Yes</p>
      ) : (
        <p hidden>Awake: Not Supported</p>
      )}
    </div>
  );
}
