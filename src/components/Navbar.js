import * as React from 'react';
import Identicon from 'identicon.js';
import box from '../box.png';

export function Navbar({ account }) {
  return (
    <nav className="navbar navbar-dark bg-dark p-0 text-monospace">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        href="http://www.dappuniversity.com/bootcamp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={box} width="30" height="30" className="align-top" alt="" />
        D$t0r@g3
      </a>
      <ul className="navbar-nav px-3">
        <li>
          <small>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
              href={`https://etherscan.io/address/${account}`}
            >
              {account.substring(0, 6)}...
              {account.substring(account.length - 4, account.length)}
            </a>
          </small>
          {account && (
            <img
              className="ml-2"
              width="30"
              height="30"
              src={`data:image/png;base64,${new Identicon(
                account,
                30
              ).toString()}`}
              alt="user profile avatar"
            />
          )}
        </li>
      </ul>
    </nav>
  );
}
