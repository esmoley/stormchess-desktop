import { Protocol } from '../../../src/core/protocol/protocol';
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';

_chai.should();
_chai.expect;

@suite class ReplaceProtocolInUrlTest {
    before() {}

    @test 'Replace is successful'(){
        let url = "://storm-chess.com";
        let from = Protocol.StormChess+url;
        let to = Protocol.StormChess.replaceProtocolInUrl(from, Protocol.Https);
        expect(to).equal(Protocol.Https.name + url);
    }
}