import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothLE, ScanParams } from '@ionic-native/bluetooth-le';
import { BLE } from '@ionic-native/ble';

interface ScanStatus {
    address?: string;
    name?: null | string;
    rssi?: number;
    advertisement?: string;
    status?: any;
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    lockerAddress: string = '3C:A3:08:C1:BA:85';
    // lockerAddress: string = '3C:A3:08:C1:74:DA';
    deviceList: any[];

    scanStatus: ScanStatus;

    constructor(
        public navCtrl: NavController,
        public bluetoothle: BluetoothLE,
        public ble: BLE
    ) { }

    scan2() {
        alert('scan started');
        // this.bluetoothle.startScan({} as ScanParams).subscribe((res) => {
        //     // this.deviceList = res;
        //     // this.scanStatus = res;

        //     // this.ble.connect(this.lockerAddress).subscribe(res => {
        //     //     alert('ble connect : ' + res);
        //     // });
        //     alert(JSON.stringify(res));
        // });

        // setTimeout(() => {
        //     this.bluetoothle.stopScan();
        // }, 2000);

        // this.bluetoothle.unbond({ address: this.lockerAddress }).then(res => {
        //     alert('bluetoothle unbond : ' + JSON.stringify(res));
        // });

        this.bluetoothle.bond({ address: this.lockerAddress }).subscribe(res => {
            alert('bluetoothle bond : ' + JSON.stringify(res));
        });

        // this.bluetoothle.connect({ address: this.lockerAddress, autoConnect: true }).subscribe(res => {
        //     alert('bluetoothle connect : ' + JSON.stringify(res));
        // });

        this.bluetoothle.isBonded({ address: this.lockerAddress }).then(res => {
            alert('isBonded:   ' + JSON.stringify(res));
        });
    }

    scan() {
        alert('scan started');

        // this.ble.scan([], 2000).subscribe(res => {
        //     // this.deviceList.push(res);
        //     alert(JSON.stringify(res));
        //     // this.deviceList.push(res);
        // });

        this.ble.connect(this.lockerAddress).subscribe(res => {
            alert('ble connect : ' + JSON.stringify(res));
            this.ble.isConnected(this.lockerAddress).then(res2 => {
                alert('isConnected :  ' + JSON.stringify(res2));
            });
        });

        this.ble.refreshDeviceCache(this.lockerAddress, 2000).then(res => {
            alert('ble refreshDeviceCache : ' + JSON.stringify(res));
        });
    }

    stringToBytes() {
        const string = '06';
        var array = new Uint8Array(string.length);
        for (var i = 0, l = string.length; i < l; i++) {
            array[i] = string.charCodeAt(i);
        }
        console.log(array.buffer);
        return array.buffer;
    }

    gToken() {


        // this.bluetoothle.stringToBytes(`09:FF:01:02:${this.lockerAddress}`);

        // var data = new Uint8Array(6);
        // data[0] = 09;
        // data[1] = 0xFF;

        // const req = this.bluetoothle.bytesToString(data);
        // this.ble.write({ address: this.lockerAddress, characteristic: '36F5', service: 'FEE7', value: `09 FF 01 02 ${this.lockerAddress}` }).then(res => {
        //     alert('write success:   ' + JSON.stringify(res));
        // });

        // var data = new Uint8Array(1);
        // data[0] = 1;
        // this.ble.writeWithoutResponse(this.lockerAddress, 'fee7', '36f5', new Uint8Array([
        // this.ble.writeWithoutResponse(this.lockerAddress, '0000fee7-0000-1000-8000-00805f9b34fb', '000036f5-0000-1000-8000-00805f9b34fb', new Uint8Array([
        this.ble.write(this.lockerAddress, '0000fee7-0000-1000-8000-00805f9b34fb', '000036f5-0000-1000-8000-00805f9b34fb', new Uint8Array([
            -28, -82, -43, -26,
            123, -38, 17, -20,
            -48, 123, -121, 117,
            111, -113, 78, 37
        ]).buffer).then(res => {
            alert('write success:   ' + JSON.stringify(res));
            this.ble.read(this.lockerAddress, '0000fee7-0000-1000-8000-00805f9b34fb', '000036f6-0000-1000-8000-00805f9b34fb').then(res => {
                alert('read success:   ' + JSON.stringify(res));
            }).catch(e => {
                alert('error:   ' + JSON.stringify(e));
            });
        }).catch(e => {
            alert('error:   ' + JSON.stringify(e));
        });
    }

    succces() {

    } xadsds

    failure() {

    }

    status() {
        // this.bluetoothle.isBonded({ address: this.lockerAddress }).then(res => {
        //     alert('isBonded:   ' + JSON.stringify(res));
        // });
        this.ble.isConnected(this.lockerAddress).then(res => {
            alert('isConnected:   ' + JSON.stringify(res));
        });
    }

    disConnect() {
        this.ble.disconnect(this.lockerAddress).then(res => {
            alert('ble disconnect : ' + JSON.stringify(res));
        });

        // this.bluetoothle.unbond({ address: this.lockerAddress }).then(res => {
        //     alert('bluetoothle unbond : ' + JSON.stringify(res));
        // });
    }

}
