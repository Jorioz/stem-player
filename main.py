import os
import argparse
from spleeter.separator import Separator
from pydub import AudioSegment

def main(audio_file, output_path):
    # Check if the output folder exists, otherwise create it
    os.makedirs(output_path, exist_ok=True)

    # Spleeter 4stems model at 16kHz
    separator = Separator('spleeter:4stems-16kHz')

    # Separate audio
    separator.separate_to_file(audio_file, output_path)

    # Get the basename of the audio file without extension
    audio_basename = os.path.splitext(os.path.basename(audio_file))[0]

    # Convert output WAV files to MP3
    for stem in ['vocals', 'drums', 'bass', 'other']:
        wav_audio = AudioSegment.from_file(f"{output_path}/{audio_basename}/{stem}.wav", format="wav")
        wav_audio.export(f"{output_path}/{audio_basename}/{stem}.mp3", format="mp3")

    print("Spleeter script finished running.")  # Print message upon completion

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process audio file with Spleeter.')
    parser.add_argument('audio_file', type=str, help='Path to the input audio file')
    parser.add_argument('output_path', type=str, help='Path to the output directory')
    args = parser.parse_args()
    
    main(args.audio_file, args.output_path)
