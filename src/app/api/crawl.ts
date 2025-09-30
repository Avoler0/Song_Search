import { spawn } from 'child_process';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(){
    await new Promise<void>((resolve, reject) => {
        const scriptPath = path.join(process.cwd(), '');
    })
}